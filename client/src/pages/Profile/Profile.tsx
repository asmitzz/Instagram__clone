import { Outlet } from "react-router-dom";
import ProfileSection from "./components/ProfileSection";
import "./Profile.css";

const Profile = () => {
    return (
        <div className="profile__container">
            <ProfileSection/>
            <Outlet/>
        </div>
    );
};

export default Profile;
