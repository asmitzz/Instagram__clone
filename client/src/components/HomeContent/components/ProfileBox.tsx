import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";

const ProfileBox = () => {
  const user = useAppSelector(state => state.auth.user);
  
  return (
     <div>
         <Link to="/profile" className="avatar">
         <img
            className="avatar__img"
            width="50px"
            height="50px"
            alt="profile"
            src={user?.pic}
         />
         <div>
           <h4 className="username">{user?.username}</h4>
           <span className="fullname">{user?.fullname}</span>
         </div>
         </Link>
     </div>
  );
};

export default ProfileBox;
