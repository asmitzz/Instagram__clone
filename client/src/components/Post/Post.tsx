import { Link } from "react-router-dom";
import PostIcons from "./PostIcons";

import "./Post.css";

const Post = () => {
    return (
        <div className="post">
            <div className="post__header">
                <Link to="/" className="avatar">
                  <img className="avatar__img" alt="profile" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
                  <span className="username">smit__asmit008</span>
                </Link>
                <div className="options">...</div>
            </div>

            <img alt="pic" width="100%" height="auto" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
            
            <div className="post__footer">
                <PostIcons/>
                <h6 className="post__likes">1,083 likes</h6>
                <div className="post__caption">
                    <strong>smit__asmit008</strong> Are you trying to learn how to code and get a job as a developer?
                </div>
                <Link to="/" className="post__comments">View all 23 comments</Link>
                <div className="post__time">
                    9 HOURS AGO
                </div>
                <div className="commentBox">
                  <input type="text" className="add__comment" placeholder="Add a comment..."/>
                  <button type="submit" className="post__btn" disabled={true}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default Post