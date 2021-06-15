import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../features/posts/posts.types";
import { timestamp } from "../../utils/timestamp/timestamp";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { commentPressed } from "../../features/posts/postsSlice";

import PostIcons from "./PostIcons";

import ReactPlayer from "react-player";

import "./Post.css";

const PostCard = ({_id,file,postedBy,caption,comments,likes,createdAt}:Post) => {
    const time = timestamp(new Date(createdAt));
    const userId = useAppSelector(state => state.auth.user?._id);
    const { token } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const like = likes.find( uid => uid === userId );
    const extension = file.split(".").pop() || "";

    const isImg = ["jpg","png","jpeg"].includes(extension);
    const isVideo = ["mp3","mp4"].includes(extension);

    const [comment,setComment] = useState<string>("");

    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(commentPressed({token,comment,postId:_id}));
        setComment("");
    }
    
    return (
        <div className="post">
            <div className="post__header">
                <Link to={postedBy._id === userId ? "/profile" : `/viewprofile/${postedBy._id}`} className="avatar">
                  <img className="avatar__img" alt="profile" src={postedBy.pic}/>
                  <span className="username">{postedBy.username}</span>
                </Link>
                <div className="options">...</div>
            </div>

            {isImg && <img alt="pic" width="100%" height="auto" src={file}/>}
            {isVideo && <ReactPlayer controls={true} url={file} width="100%" height="auto"/>}
            
            <div className="post__footer">
                <PostIcons postId={_id} like={like ? true : false}/>
                <h6 className="post__likes">{likes.length} likes</h6>
                <div className="post__caption">
                    <strong>{postedBy.username}</strong> {caption}
                </div>
                <Link to={`/comments/${_id}`} className="post__comments">{ comments.length === 0 ? "no comments" : `View all ${comments.length} comments` }</Link>
                
                <div className="post__time">
                    {time} AGO
                </div>

                <form className="commentBox" onSubmit={handleSubmit}>
                  <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} className="add__comment" placeholder="Add a comment..."/>
                  <button type="submit" className="post__btn" disabled={comment === ""}>Post</button>
                </form>
            </div>
        </div>
    )
}

export default PostCard;