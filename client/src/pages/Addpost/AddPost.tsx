import Input from "../../utils/form/Input/Input";
import ReactPlayer from "react-player";
import { useState } from "react";
import { Post } from "./AddPost.types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { uploadPost } from "../../features/posts/postsSlice";
import { Status } from "../../generic.types";
import { unwrapResult } from "@reduxjs/toolkit";
import { useIsMountedRef } from "../../utils/custom-hooks/useIsMountedRef";
import "./AddPost.css";

const AddPost = () => {
    const isMountedRef = useIsMountedRef();

    const [post,setPost] = useState<Post>({src:null,extension:"",caption:""});
    const [file,setFile] = useState<File|null>(null);
    const [uploadPostStatus,setUploadPostStatus] = useState<Status>("idle");
    const [extensionErr,setExtensionErr] = useState<boolean>(false);
    const [processing,setProcessing] = useState<boolean>(false);

    const canSave = [post.src].every(Boolean) && uploadPostStatus === "idle";
    const isImg =  ["jpg", "png","jpeg"].includes(post.extension);
    const isVideo = post.extension === "mp4";
   
    const { token } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setExtensionErr(false)
        const {name,type,value,files} = e.target;

        if(type === "file" && files){
            let extension = files[0].name.split('.').pop() || "";
            let isExtensionValid = ["jpg", "png", "jpeg","mp4"].includes(extension);

            if(isExtensionValid){
                const file = new FileReader();
                file.readAsDataURL(files[0]);
                file.onloadstart = () => {
                    setProcessing(true)
                }
                file.onloadend = () => {
                    setProcessing(false)
                    setFile(files[0]);
                    setPost(state => ({ ...state,[name]:file.result,extension }));
                }
            }
            else{
                setExtensionErr(true)
            }
            return;
        }

        setPost(state => ({ ...state,[name]:value }))
    }

    const handlePost = async(e:React.FormEvent) => {
        e.preventDefault();
        if(!isMountedRef.current) return;
        if(file && canSave){
            try {
                setUploadPostStatus("pending");
                const resultAction = await dispatch(uploadPost({file,caption:post.caption,token}));
                unwrapResult(resultAction);
                setPost({src:null,caption:"",extension:""});
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
            {extensionErr && <div className="invalid__feedback">Please select only image and videos</div>}
            {processing && <div className="valid__feedback">Processing...</div>}
            {uploadPostStatus === "failed" && <div className="invalid__feedback">something went wrong!!</div>}
            {uploadPostStatus === "pending" && <div className="valid__feedback">Uploading...</div>}
            {uploadPostStatus === "succeeded" && <div className="valid__feedback">post successfully uploaded!!</div>}
 
            {   
                isImg && typeof post.src === "string" &&
                <div className="file__container">
                    <button className="dismiss__btn" onClick={() => setPost(state => ({...state,src:null}))}><i className="fa fa-window-close"></i></button>
                    <img className="file" alt="users" src={post.src}/>
                </div>
            }

            {   
                isVideo && typeof post.src === "string" &&
                <div className="file__container">
                    <button className="dismiss__btn" onClick={() => setPost(state => ({...state,src:null}))}><i className="fa fa-window-close"></i></button>
                    <ReactPlayer width="100%" height="100%" controls={true} url={post.src}/>
                </div>
            }
            
            <form onSubmit={handlePost}>
                { 
                  !post.src && !processing && 
                  <div className="form__group upload__icon">
                    <i className="fa fa-plus"></i>
                    <input type="file" name="src" className="upload__file" onChange={handleChange} accept=".jpg,.jpeg,.png,.mp4"/>
                    <small></small>
                  </div>
                }

                <Input type="text" name="caption" value={post.caption} error={false} onChange={handleChange} placeholder="Caption" />
                <div className="form__group">
                  <input type="submit" disabled={!canSave} className="submit__btn" value={["idle","succeeded"].includes(uploadPostStatus) ? "POST" : "POSTING..."}/>
                </div>
            </form>
        </div>
    );
};

export default AddPost;