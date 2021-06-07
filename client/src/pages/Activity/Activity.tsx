import { useEffect } from "react";
import ReactPlayer from "react-player";
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
                         <img alt="profile" className="userpic" src={user.pic}/>
                         <p className="description"><strong>{user.username}</strong> requested to follow you.</p>
                      </Link>
                      <button className="primary__btn">Confirm</button>
                      <button className="secondary__btn">Delete</button>
                   </div>
                ))
            }

            {
                activities?.activity.map( activity => {
                 const extension = activity.file.split(".").pop();
                 const isImg = ["jpg","png","jpeg"].some(type => type === extension);
                 const isVideo = ["mp3","mp4"].some(type => type === extension);
                 
                 return(
                    <Link to="/" className="activity__content" key={activity._id}>
                      <div className="userpic__and__activity">
                        <img alt="profile" className="userpic" src={activity.user.pic}/>
                        <p className="description"><strong>{activity.user.username}</strong> {activity.text}</p>
                      </div>
                      {isImg && <img alt="post" className="post" src={activity.file}/>}
                      {isVideo && <ReactPlayer width="50px" height="50px" url={activity.file}/>}
                    </Link>
                )})
            }
        </div>
    );
};

export default Activity;
