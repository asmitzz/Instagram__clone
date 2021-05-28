import UserChats from "./components/UserChats";
import UsersList from "./components/UsersList";

import "./Chats.css";

const Chats = () => {
    return (
        <div className="chats__box">
             <div className="chats__container">
                 <UsersList/>
                 <UserChats/>
             </div>
        </div>
    );
};

export default Chats;
