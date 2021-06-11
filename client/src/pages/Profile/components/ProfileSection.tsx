import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";

const ProfileSection = () => {
    const {connections,profile,userposts} = useAppSelector(state => state.profile);
    const navigate = useNavigate();

    return (
        <div className="profile__section">
               <img className="profile__avatar" alt="profile" src={profile.pic}/>
               <span className="username__mobile">{profile.username}</span>
               <div className="profile__details">
                   <div className="section__1">
                       <span className="username__desktop">{profile.username}</span>
                       <button className="edit__profile__btn" onClick={() => navigate("/profile/edit")}>Edit Profile</button>
                   </div>
                   <div className="section__2">
                       <div><span>{userposts.length}</span> posts</div>
                       <Link to={`/followers/${profile._id}`} className="nav__link"><span>{connections?.followers.length}</span> followers</Link>
                       <Link to={`/following/${profile._id}`} className="nav__link"><span>{connections?.following.length}</span> following</Link>
                   </div>
                   <div className="section__3">
                       <div className="fullname">{profile.fullname}</div>
                       <p className="bio">{profile.bio}</p>
                       <a href={profile.website} rel="noreferrer" target="_blank" className="website__link">{profile.website}</a>
                   </div>
               </div>
            </div>
    );
};

export default ProfileSection;
