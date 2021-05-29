import { Link } from "react-router-dom";

const Following = () => {
    return (
        <div className="follow__container">
            <h4 className="follow__heading">Following</h4>
            <div className="follower">
                <Link to="/viewprofile" className="user">
                  <img className="user__pic" alt="users" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
                  <div className="user__details">
                    <span className="username">smit__asmit008</span>
                    <span className="fullname">Asmit shrivastava</span>
                  </div>
                </Link>
               <button className="removeBtn">Following</button>
            </div>
        </div>
    );
};

export default Following;
