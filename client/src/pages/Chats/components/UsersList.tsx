import { Link } from "react-router-dom";

const UsersList = () => {
    
    return (
        <div className="userslist">
            <header className="userslist__header">smit__asmit008</header>
            <div className="userslist__search__bar">
               <input className="search__input" placeholder="Search"/>
            </div>

            <Link to="/chats/:chatId" className="users">
               <img width="60px" className="user__pic" alt="users" height="60px" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
               <div className="user__details">
                   <div className="username">smit__asmit008</div>
                   <div className="status">Active now</div>
               </div>
            </Link>
           
        </div>
    );
};

export default UsersList;
