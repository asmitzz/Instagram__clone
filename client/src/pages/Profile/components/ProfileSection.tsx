import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";

const ProfileSection = () => {
    const user = useAppSelector(state => state.auth.user);
    const {connections} = useAppSelector(state => state.profile);

    return (
        <div className="profile__section">
               <img className="profile__avatar" alt="profile" src={user?.pic}/>
               <span className="username__mobile">{user?.username}</span>
               <div className="profile__details">
                   <div className="section__1">
                       <span className="username__desktop">{user?.username}</span>
                       <button className="edit__profile__btn">Edit Profile</button>
                   </div>
                   <div className="section__2">
                       <div><span>15</span> posts</div>
                       <NavLink to="/profile/followers" className="nav__link"><span>{connections?.followers.length}</span> followers</NavLink>
                       <NavLink to="/profile/following" className="nav__link"><span>{connections?.following.length}</span> following</NavLink>
                   </div>
                   <div className="section__3">
                       <div className="fullname">{user?.fullname}</div>
                       <p className="bio">{user?.bio}</p>
                       <a href={user?.website} rel="noreferrer" target="_blank" className="website__link">{user?.website}</a>
                   </div>
               </div>
            </div>
    );
};

export default ProfileSection;
