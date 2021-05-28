import "./Chats.css";
import UserChats from "./components/UserChats";
import UsersList from "./components/UsersList";

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
