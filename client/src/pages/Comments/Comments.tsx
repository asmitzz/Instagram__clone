import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostWithComments } from "../../features/posts/posts.types";
import { fetchComments } from "../../features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useIsMountedRef } from "../../utils/custom-hooks/useIsMountedRef";
import { timestamp } from "../../utils/timestamp/timestamp";
import "./Comments.css";

const Comments = () => {
    const mountedRef = useIsMountedRef();
    const dispatch = useAppDispatch();
    const { postId } = useParams();
    const { token } = useAppSelector(state => state.auth);
    const [data,setData] = useState<PostWithComments|null>(null);
    const time = data?.createdAt ? timestamp(new Date(data?.createdAt)) : 0;
    const navigate = useNavigate();

    useEffect(() => {
        (async function(){
            if(mountedRef.current){
                dispatch(fetchComments({token,postId}))
                .then(unwrapResult)
                .then(originalPromiseResult => {
                    setData(originalPromiseResult.post)
                })
          }})()
    },[dispatch,token,postId,mountedRef])

    return (
        <div className="comments__container">
            <div className="comments__header">
                <button className="backBtn" onClick={() => navigate(-1)}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                <h3>Comments</h3>
            </div>

            <div className="post__caption">
                <div className="avatar">
                  <img className="avatar" alt="post" src={data?.postedBy.pic}/>
                </div>
                <div className="caption__content">
                    <div>
                      <span className="username">{data?.postedBy.username}</span>
                      <span className="caption">{data?.caption}</span>
                    </div>
                    <div>
                        <span className="post__time">{time}</span>
                    </div>
                </div>
            </div>

            {
                data?.comments.map( comment => {
                    let time = timestamp(new Date(comment.createdAt));
                    return(
                    <div className="comments" key={comment._id}>
                       <div className="avatar">
                          <img className="avatar" alt="post" src={comment.user.pic}/>
                       </div>
                       <div className="caption__content">
                         <div>
                            <span className="username">{comment.user.username}</span>
                            <span className="caption">{comment.text}</span>
                         </div>
                         <div>
                            <span className="post__time">{time}</span>
                            <button className="likes__btn">{comment.likes.length} likes</button>
                            <button className="reply__btn">Reply</button>
                          </div>
                       </div>
                    </div>
                )})
            }

        </div>
    );
};

export default Comments;