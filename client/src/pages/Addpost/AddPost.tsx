import Input from "../../utils/form/Input/Input";

import { useState } from "react";
import { Post } from "./AddPost.types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { uploadPost } from "../../features/posts/postsSlice";
import { Status } from "../../generic.types";
import { unwrapResult } from "@reduxjs/toolkit";

import "./AddPost.css";

const AddPost = () => {
    const [post,setPost] = useState<Post>({file:null,caption:""});
    const [file,setFile] = useState<File|null>(null);
    const [uploadPostStatus,setUploadPostStatus] = useState<Status>("idle");

    const canSave = [post.caption,file].every(Boolean) && uploadPostStatus === "idle";
   
    const {token} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value,files} = e.target;
        if(name === "file" && files){
            const file = new FileReader();
            file.readAsDataURL(files[0]);
            file.onloadend = () => {
                setFile(files[0]);
                setPost(state => ({ ...state,[name]:file.result }));
            }
            return;
        }
        setPost(state => ({ ...state,[name]:value }))
    }

    const handlePost = async(e:React.FormEvent) => {
        e.preventDefault()
        if(file && canSave){
            try {
                setUploadPostStatus("pending");
                const resultAction = await dispatch(uploadPost({file,caption:post.caption,token}));
                unwrapResult(resultAction);
                setPost({file:null,caption:""});
                setFile(null);
                setUploadPostStatus("succeeded");
            } catch(error){
                setUploadPostStatus("failed");
            }
            finally{
                setTimeout(() => {
                    setUploadPostStatus("idle")
                },3000)
            }
        }
    }
 
    return (
        <div className="addpost__container">
            {uploadPostStatus === "failed" && <div className="invalid__feedback">something went wrong!!</div>}
            {uploadPostStatus === "succeeded" && <div className="valid__feedback">post successfully uploaded!!</div>}

            {   
                typeof post.file === "string" && 
                <div className="file__container">
                    <button className="dismiss__btn" onClick={() => setPost(state => ({...state,file:null}))}><i className="fa fa-window-close"></i></button>
                    <img className="file" alt="users" src={post.file}/>
                </div>
            }
            <form onSubmit={handlePost}>
                { 
                  !post.file && 
                  <div className="form__group upload__icon">
                    <i className="fa fa-plus"></i>
                    <input type="file" name="file" className="upload__file" onChange={handleChange} accept=".jpg,.jpeg,.png,.mp3,.mp4"/>
                  </div>
                }

                <Input type="text" name="caption" value={post.caption} error={false} onChange={handleChange} placeholder="Caption" />
                <div className="form__group">
                  <input type="submit" disabled={!canSave} className="submit__btn" value={uploadPostStatus === "idle" ? "POST" : "POSTING"}/>
                </div>
            </form>
        </div>
    );
};

export default AddPost;
