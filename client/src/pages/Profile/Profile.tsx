import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchProfile } from "../../features/profile/profileSlice";
import { fetchSavedPosts } from "../../features/savedposts/savedpostsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ProfileSection from "./components/ProfileSection";
import "./Profile.css";

const Profile = () => {
    const token = useAppSelector(state => state.auth.token);
    const profileRequestStatus = useAppSelector(state => state.profile.status);
    const savedPostsRequestStatus = useAppSelector(state => state.savedposts.status);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(profileRequestStatus === "idle"){
            dispatch(fetchProfile({token}))
        }
    },[dispatch,profileRequestStatus,token])

    useEffect(() => {
        if(savedPostsRequestStatus === "idle"){
            dispatch(fetchSavedPosts({token}))
        }
    },[dispatch,savedPostsRequestStatus,token])

    return (
        <div className="profile__container">
            <ProfileSection/>
            <Outlet/>
        </div>
    );
};

export default Profile;
