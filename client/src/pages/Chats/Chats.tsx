import UsersList from "./components/UsersList";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchChats } from "../../features/chats/chatsSlice";
import "./Chats.css";

const Chats = () => {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state) => state.chats);
    const token = useAppSelector((state) => state.auth.token);

    useEffect(() => {
        if (status === "idle") {
          dispatch(fetchChats({ token }));
        }
      }, [status,dispatch,token]);
    return (
        <div className="chats__box">
             <div className="chats__container">
                 <UsersList/>
                 <Outlet/>
             </div>
        </div>
    );
};

export default Chats;
