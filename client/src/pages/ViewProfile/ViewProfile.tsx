import { useEffect, useState } from "react";
import { fetchViewProfile } from "../../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useIsMountedRef } from "../../utils/custom-hooks/useIsMountedRef";
import { useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { ViewProfileData } from "../../features/profile/profileSlice.types";
import Spinner from "../../utils/Spinner/Spinner";
import ProfileSection from "./components/ProfileSection";
import PostsSection from "./components/PostsSection";

import "../Profile/Profile.css";
import "./ViewProfile.css";
import { Status } from "../../generic.types";

const ViewProfile = () => {
    const dispatch = useAppDispatch();
    const mountedRef = useIsMountedRef();
    const token = useAppSelector(state => state.auth.token);
    const yourUserId = useAppSelector(state => state.auth.user?._id);
    const userId = useParams().userId;
    const [data,setData] = useState<ViewProfileData>();
    const [status,setStatus] = useState<Status>("idle");
    const isYouFollowingUser = data?.connections.followers.find( uid => uid === yourUserId );

    useEffect(() => {
        (async function(){
            if(mountedRef.current){
                dispatch(fetchViewProfile({token,userId}))
                .then(unwrapResult)
                .then(originalPromiseResult => {
                    setData(originalPromiseResult)
                    setStatus("succeeded")
                })
          }})()
    },[dispatch,token,userId,mountedRef])
  
    return (
        <div className="profile__container viewprofile">
            { status !== "succeeded" && <div className="spinner__container"> <Spinner/> </div>} 

            { data && <ProfileSection isYouFollowingUser={isYouFollowingUser} profile={data?.profile} activities={data.activities} posts={data?.userposts} connections={data?.connections} setData={setData}/>}
            { data && <PostsSection isYouFollowingUser={isYouFollowingUser} posts={data?.userposts} accountPrivate={data.profile.private}/>}
        </div>
    );
};

export default ViewProfile;