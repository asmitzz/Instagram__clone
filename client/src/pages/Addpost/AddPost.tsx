import Input from "../../utils/form/Input/Input";
import { useState } from "react";
// import { uploadFile } from "../../utils/UploadFile/uploadFile";
import { Post } from "./AddPost.types";

import { uploadPost } from "../../services/post/post.services";
import { useAppSelector } from "../../store/hooks";
import "./AddPost.css";

const AddPost = () => {
    const [post,setPost] = useState<Post>({file:null,caption:""});
    const [file,setFile] = useState<File|null>(null);
    const [error] = useState<string>("");
    const {token} = useAppSelector(state => state.auth);

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
        if(file && token){
            const res = await uploadPost({file,caption:post.caption},token);
            console.log(res);
        }
    }
 
    return (
        <div className="addpost__container">
            <small>{error}</small>
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
                  <input type="submit" disabled={post.file === null} className="submit__btn" value="POST"/>
                </div>
            </form>
        </div>
    )
}

export default AddPost
