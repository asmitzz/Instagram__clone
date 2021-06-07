import { useEffect, useState } from "react";
import { fetchViewProfile } from "../../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useIsMountedRef } from "../../utils/custom-hooks/useIsMountedRef";
import { useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { ViewProfileData } from "../../features/profile/profileSlice.types";

import ProfileSection from "./components/ProfileSection";
import PostsSection from "./components/PostsSection";

import "../Profile/Profile.css";
import "./ViewProfile.css";

const ViewProfile = () => {
    const dispatch = useAppDispatch();
    const mountedRef = useIsMountedRef();
    const token = useAppSelector(state => state.auth.token);
    const userId = useParams().userId;
    const [data,setData] = useState<ViewProfileData>();

    useEffect(() => {
        (async function(){
            if(mountedRef.current){
                dispatch(fetchViewProfile({token,userId}))
                .then(unwrapResult)
                .then(originalPromiseResult => {
                    setData(originalPromiseResult)
                })
          }})()
    },[dispatch,token,userId,mountedRef])
  
    return (
        <div className="profile__container viewprofile">
            { data && <ProfileSection profile={data?.profile} activities={data.activities} posts={data?.userposts} connections={data?.connections} setData={setData}/>}
            { data && <PostsSection posts={data?.userposts}/>}
        </div>
    );
};

export default ViewProfile;