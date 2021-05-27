import "./Comments.css";

const Comments = () => {
    return (
        <div className="comments__container">
            <div className="comments__header">
                <button className="backBtn"><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                <h3>Comments</h3>
            </div>

            <div className="post__caption">
                <div className="avatar">
                  <img className="avatar"alt="post" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
                </div>
                <div className="caption__content">
                    <div>
                      <span className="username">asmitzz</span>
                      <span className="caption">mast lag raha hai bro</span>
                    </div>
                    <div>
                        <span className="post__time">3h</span>
                    </div>
                </div>
            </div>

            <div className="comments">
                <div className="avatar">
                  <img className="avatar"alt="post" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
                </div>
                <div className="caption__content">
                    <div>
                      <span className="username">asmitzz</span>
                      <span className="caption">mast lag raha hai bro</span>
                    </div>
                    <div>
                        <span className="post__time">3h</span>
                        <button className="likes__btn">6 likes</button>
                        <button className="reply__btn">Reply</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Comments;