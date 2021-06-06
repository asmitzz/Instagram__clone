import { Link } from "react-router-dom";
import "./Activity.css";

const Activity = () => {
    return (
        <div className="activity">
            <h3 className="activity__heading">Activity</h3>

            <Link to="/" className="activity__content">
                <div className="userpic__and__activity">
                   <img alt="profile" width="40px" height="40px" src="https://www.svgrepo.com/show/122119/user-image-with-black-background.svg"/>
                   <p className="description"><strong>asmitzz</strong> liked your photo</p>
                </div>
                <div>
                  <button className="primary__btn">Confirm</button>
                  <button className="secondary__btn">Delete</button>
                </div>
            </Link>

            <Link to="/" className="activity__content">
                <div className="userpic__and__activity">
                   <img alt="profile" width="40px" height="40px" src="https://www.svgrepo.com/show/122119/user-image-with-black-background.svg"/>
                   <p className="description"><strong>asmitzz</strong> liked your photo</p>
                </div>
                <img alt="profile" width="40px" height="40px" src="https://www.svgrepo.com/show/122119/user-image-with-black-background.svg"/>
            </Link>
        </div>
    );
};

export default Activity;
