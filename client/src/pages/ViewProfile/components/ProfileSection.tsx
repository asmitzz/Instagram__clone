import { Link } from "react-router-dom";
import { Connection, UserProfile } from "../../../features/profile/profileSlice.types";
import { useAppSelector } from "../../../store/hooks";

type ProfileSectionProps = {
    profile:UserProfile;
    connections:Connection;
}

const ProfileSection = ({profile,connections}:ProfileSectionProps) => {

    const userId = useAppSelector(state => state.auth.user?._id);
    const isFollow = connections.followers.some( uid => uid === userId );

    return (
        <div className="profile__section">
               <img className="profile__avatar" alt="profile" src={profile.pic}/>
               <span className="username__mobile">{profile.username}</span>
               <div className="profile__details">
                   <div className="section__1">
                       <span className="username__desktop">{profile.username}</span>
                       <div className="profile__btn__container">
                          { 
                          isFollow ? 
                          <button className="following__btn">Following</button>:
                          <button className="follow__btn">Follow</button>
                          }
                          <button className="message__btn">Message</button>
                       </div>
                   </div>
                   <div className="section__2">
                       <div><span>15</span> posts</div>
                       <Link to={ isFollow || !profile.private ? `/followers/${profile._id}` : ""} className="nav__link"><span>{connections?.followers.length}</span> followers</Link>
                       <Link to={ isFollow || !profile.private ? `/following/${profile._id}` : ""} className="nav__link"><span>{connections?.following.length}</span> following</Link>
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