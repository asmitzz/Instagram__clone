import { NavLink } from "react-router-dom";

const ProfileSection = () => {

    return (
        <div className="profile__section">
               <img className="profile__avatar" alt="profile" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
               <span className="username__mobile">smit__asmit008</span>
               <div className="profile__details">
                   <div className="section__1">
                       <span className="username__desktop">smit__asmit008</span>
                       <button className="edit__profile__btn">Edit Profile</button>
                   </div>
                   <div className="section__2">
                       <div><span>15</span> posts</div>
                       <NavLink to="/profile/followers" className="nav__link"><span>155</span> followers</NavLink>
                       <NavLink to="/profile/following" className="nav__link"><span>249</span> following</NavLink>
                   </div>
                   <div className="section__3">
                       <div className="fullname">Asmit shrivastava</div>
                       <p className="bio">
                         Web Developer
                         I play LIFE like a pro.. so stay alert 😉
                         Hotmusic web app 👇</p>
                       <a href="/" target="_blank" className="website__link">songs_video_app</a>
                   </div>
               </div>
            </div>
    );
};

export default ProfileSection;
