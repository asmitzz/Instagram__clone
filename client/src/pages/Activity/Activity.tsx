import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchActivity } from "../../features/activity/activitySlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Activity.css";

const Activity = () => {
    const { activities,status } = useAppSelector(state => state.activity);
    const token = useAppSelector(state => state.auth.token);
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if(status === "idle"){
            dispatch(fetchActivity({token}));
        }
     },[status,token,dispatch])

    return (
        <div className="activity">
            <h4 className="activity__heading">Activity</h4>

            {
                activities?.requests.map( user => (
                    <div className="activity__content" key={user._id}>
                      <Link to="" className="userpic__and__activity">
                         <img alt="profile" className="userpic" src="https://www.svgrepo.com/show/122119/user-image-with-black-background.svg"/>
                         <p className="description"><strong>{user.username}</strong> requested to follow you.</p>
                      </Link>
                      <div>
                         <button className="primary__btn">Confirm</button>
                         <button className="secondary__btn">Delete</button>
                      </div>
                   </div>
                ))
            }

            {
                activities?.activity.map( activity => (
                    <Link to="/" className="activity__content" key={activity._id}>
                      <div className="userpic__and__activity">
                        <img alt="profile" className="userpic" src={activity.user.pic}/>
                        <p className="description"><strong>{activity.user.username}</strong> {activity.text}</p>
                      </div>
                      <img alt="post" className="post" src={activity.file}/>
                    </Link>
                ) )
            }
        </div>
    );
};

export default Activity;
