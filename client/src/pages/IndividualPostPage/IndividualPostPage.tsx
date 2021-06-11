import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Post } from "../../features/posts/posts.types";
import { timestamp } from "../../utils/timestamp/timestamp";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { commentPressed, fetchPost } from "../../features/posts/postsSlice";

import ReactPlayer from "react-player";
import { useIsMountedRef } from "../../utils/custom-hooks/useIsMountedRef";
import { unwrapResult } from "@reduxjs/toolkit";
import PostIcons from "./IndividualPostIcon";
import "./IndividualPostPage.css";

const IndividualPostPage = () => {
    const mountedRef = useIsMountedRef();
    const dispatch = useAppDispatch();
    const { token } = useAppSelector(state => state.auth);
    const { postId } = useParams();

    const [post,setPost] = useState<Post>({
        _id: "",
        file: "",
        postedBy:{
            _id:"",
            pic:"",
            username:"",
            fullname:""
        },
        caption: "",
        likes: [],
        comments: [],
        createdAt: "",
    })

    const extension = post.file.split(".").pop() || "";
 
    const isImg = ["jpg","png","jpeg"].includes(extension);
    const isVideo = ["mp3","mp4"].includes(extension);
    const userId = useAppSelector(state => state.auth.user?._id)
    const like = post.likes.find( uid => uid === userId );
    const time = timestamp(new Date(post.createdAt));

    const [comment,setComment] = useState<string>("");

    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(commentPressed({token,comment,postId}))
        .then(unwrapResult).then(originalPromiseResult => {
            setPost(originalPromiseResult.post)
        });
        setComment("");
    }

    useEffect(() => {
        (async function(){
            if(mountedRef.current){
                dispatch(fetchPost({token,postId}))
                .then(unwrapResult)
                .then(originalPromiseResult => {
                    setPost(originalPromiseResult.post)
                })
          }})()
    },[dispatch,mountedRef,token,postId])
    
    return (
        <div className="post individualPost">
            <div className="post__header">
                <Link to={post.postedBy._id === userId ? "/profile" : `/viewprofile/${post.postedBy._id}`} className="avatar">
                  <img className="avatar__img" alt="profile" src={post.postedBy.pic}/>
                  <span className="username">{post.postedBy.username}</span>
                </Link>
                <div className="options">...</div>
            </div>

            {isImg && <img alt="pic" width="100%" style={{ maxHeight:"700px",objectFit:"cover" }} height="auto" src={post.file}/>}
            {isVideo && <ReactPlayer controls={true} url={post.file} width="100%" style={{ maxHeight:"700px" }} height="auto"/>}
            
            <div className="post__footer">
                <PostIcons setPost={setPost} postId={post._id} like={like ? true : false}/>
                <h6 className="post__likes">{post.likes.length} likes</h6>
                <div className="post__caption">
                    <strong>{post.postedBy.username}</strong> {post.caption}
                </div>
                <Link to={`/comments/${post._id}`} className="post__comments">{ post.comments.length === 0 ? "no comments" : `View all ${post.comments.length} comments` }</Link>
                
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

export default IndividualPostPage;