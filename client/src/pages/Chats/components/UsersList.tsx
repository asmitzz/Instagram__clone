import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";

const UsersList = () => {
  const { chats } = useAppSelector((state) => state.chats);
  const userId = useAppSelector((state) => state.auth.user?._id);
  const username = useAppSelector((state) => state.auth.user?.username);
  const { pathname } = useLocation();

  const filteredChats = chats.filter( chat => chat.messages.length !== 0 || pathname === `/chats/${chat._id}` )

  return (
    <div className="userslist">
      <header className="userslist__header">{username}</header>
      <div className="userslist__search__bar">
        <input className="search__input" placeholder="Search" />
      </div>

      {filteredChats.map((chat) => {
        const user = chat.users.find( user => user._id !== userId )
        return (
          <Link to={`/chats/${chat._id}`} state={{ messages:chat.messages }} className="users" key={chat._id}>
            <img
              width="60px"
              className="user__pic"
              alt="users"
              height="60px"
              src={user?.pic}
            />
            <div className="user__details">
              <div className="username">{user?.username}</div>
              {/* <div className="status">Active now</div> */}
            </div>
          </Link>
        );
      })}

      {
         filteredChats.length === 0 && <div className="nochatsfound">No chats found</div>
      }
    </div>
  );
};

export default UsersList;
