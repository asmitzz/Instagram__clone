import PostsSection from "./components/PostsSection";
import ProfileSection from "./components/ProfileSection";
import "./Profile.css";

const Profile = () => {
    return (
        <div className="profile__container">
            <ProfileSection/>
            <PostsSection/>
        </div>
    );
};

export default Profile;
