import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchProfile } from "../../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ProfileSection from "./components/ProfileSection";
import "./Profile.css";

const Profile = () => {
    const token = useAppSelector(state => state.auth.token);
    const {status} = useAppSelector(state => state.profile);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(status === "idle"){
            dispatch(fetchProfile({token}))
        }
    },[dispatch,status,token])

    return (
        <div className="profile__container">
            <ProfileSection/>
            <Outlet/>
        </div>
    );
};

export default Profile;
