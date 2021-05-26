import { Link } from "react-router-dom";

const ProfileBox = () => {
  return (
     <div>
         <Link to="/" className="avatar">
         <img
            className="avatar__img"
            width="50px"
            height="50px"
            alt="profile"
            src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"
         />
         <div>
           <h4 className="username">smit__asmit008</h4>
           <span className="fullname">Asmit shrivastava</span>
         </div>
         </Link>
     </div>
  );
};

export default ProfileBox;
