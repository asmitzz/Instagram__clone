import { Link } from "react-router-dom";
import { Post } from "../../features/posts/posts.types";
import { timestamp } from "../../utils/timestamp/timestamp";
import { useAppSelector } from "../../store/hooks";

import PostIcons from "./PostIcons";

import "./Post.css";

const PostCard = ({file,postedBy,caption,comments,likes,updatedAt}:Post) => {
    const time = timestamp(new Date(updatedAt));
    const userId = useAppSelector(state => state.auth.user?._id);
    const like = likes.find( uid => uid === userId );
    
    return (
        <div className="post">
            <div className="post__header">
                <Link to="/" className="avatar">
                  <img className="avatar__img" alt="profile" src={postedBy.pic}/>
                  <span className="username">{postedBy.username}</span>
                </Link>
                <div className="options">...</div>
            </div>

            <img alt="pic" width="100%" style={{ maxHeight:"700px" }} height="auto" src={file}/>
            
            <div className="post__footer">
                <PostIcons like={like ? true : false}/>
                <h6 className="post__likes">{likes.length} likes</h6>
                <div className="post__caption">
                    <strong>{postedBy.username}</strong> {caption}
                </div>
                <Link to="/" className="post__comments">{ comments.length === 0 ? "no comments" : `View all ${comments.length} comments` }</Link>
                <div className="post__time">
                    {time} AGO
                </div>
                <div className="commentBox">
                  <input type="text" className="add__comment" placeholder="Add a comment..."/>
                  <button type="submit" className="post__btn" disabled={true}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default PostCard;