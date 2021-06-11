import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";

const ProfileBox = () => {
  const user = useAppSelector(state => state.profile.profile);
  const profile = useAppSelector(state => state.profile)
  
  return (
     <div className="profile__box">
         <Link to="/profile" className="avatar">
         <img
            className="avatar__img"
            alt="profile"
            src={user?.pic}
         />
         
          <span className="fullname">{user?.fullname}</span>
         </Link>
         <div className="profile__details">
            <Link to="/profile" className="profile__detail">
               <div>
                  <span> {profile.userposts.length}</span>
               </div>
               <span> Posts</span>
            </Link>
            <Link to={`/followers/${user?._id}`} className="profile__detail">
               <div>
                 <i className="far fa-user"></i>
                 <span> {profile.connections.followers.length}</span>
               </div>
               <span> Followers</span>
            </Link>
            <Link to={`/following/${user?._id}`} className="profile__detail">
               <div>
                 <i className="far fa-user"></i>
                 <span> {profile.connections.following.length}</span>
               </div>
               <span> Following</span>
            </Link>
         </div>
     </div>
  );
};

export default ProfileBox;
