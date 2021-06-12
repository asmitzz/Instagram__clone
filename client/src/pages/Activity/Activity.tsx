import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { confirmRequest, deleteRequest, fetchActivity } from "../../features/activity/activitySlice";
import { UpdateConnections } from "../../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Spinner from "../../utils/Spinner/Spinner";
import { timestamp } from "../../utils/timestamp/timestamp";
import "./Activity.css";

const Activity = () => {
    const { activities,status } = useAppSelector(state => state.activity);
    const token = useAppSelector(state => state.auth.token);
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if(status === "idle"){
            dispatch(fetchActivity({token}));
        }
     },[status,token,dispatch]);

     const handleConfirm = (userId:string) => {
         dispatch(confirmRequest({token,userId}))
         .then(unwrapResult)
         .then(originalPromiseResult => {
             dispatch(UpdateConnections({connections:originalPromiseResult.connections}))
         })
     }
     
     const handleDelete = (userId:string) => {
        dispatch(deleteRequest({token,userId}))
    }

    return (
        <div className="activity">
            { status !== "succeeded" && <div className="spinner__container"> <Spinner/> </div>} 

            <h4 className="activity__heading">Activity</h4>

            {
                activities?.requests.map( user => (
                    <div className="activity__content" key={user._id}>
                      <Link to="" className="userpic__and__activity">
                         <img alt="profile" className="userpic" src={user.pic}/>
                         <p className="description"><strong>{user.username}</strong> has requested to follow you.</p>
                      </Link>
                      <button className="primary__btn" onClick={() => handleConfirm(user._id)}>Confirm</button>
                      <button className="secondary__btn" onClick={() => handleDelete(user._id)}>Delete</button>
                   </div>
                )).reverse()
            }

            {
                activities?.activity.map( activity => {
                 const extension = activity?.file?.split(".").pop();
                 const isImg = ["jpg","png","jpeg"].some(type => type === extension);
                 const isVideo = ["mp3","mp4"].some(type => type === extension);
                 
                 return(
                    <Link to={`/viewprofile/${activity.user._id}`} className="activity__content" key={activity._id}>
                      <div className="userpic__and__activity">
                        <img alt="profile" className="userpic" src={activity.user.pic}/>
                        <div>
                           <p className="description"><strong>{activity.user.username}</strong> {activity.text}</p>
                           <span className="timestamp">{timestamp(new Date(activity.createdAt))}</span>
                        </div>
                      </div>
                      { isImg && <img alt="post" className="post" src={activity.file}/> }
                      { isVideo && <ReactPlayer width="50px" height="50px" url={activity.file}/> }
                    </Link>
                )}).reverse()
            }
            
        </div>
    );
};

export default Activity;
