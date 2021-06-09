import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { sendMessage } from "../../../features/chats/chatsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

const UserChatsDesktop = () => {
    const [input,setInput] = useState<string>("");
    const messagesEndRef = useRef<any>(null);

    const { chatId } = useParams();
    const { chats } = useAppSelector((state) => state.chats);
    const userId = useAppSelector((state) => state.auth.user?._id);
    const token = useAppSelector(state => state.auth.token);
    const dispatch = useAppDispatch();

    const chat = chats.find(chat => chat._id === chatId);
    const user = chat?.users.find( user => user._id !== userId );

    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault();
        if( chat && input !=="" ){
          dispatch(sendMessage({ token,text:input,chatId:chat?._id }));
          setInput("");
        }
    }

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView();
    },[chat?.messages])
    
    return (
        <div className="userchats">
            <header className="userchats__header">
               <img width="30px" className="user__pic" alt="users" height="30px" src={user?.pic}/>
               <div className="username">{user?.username}</div>
            </header>

            <div className="chats">

                 {
                    chat?.messages.map(message => message?.user?._id !== userId ? (
                      <div className="received" key={message?._id}>
                        <img width="30px" className="user__pic" alt="users" height="30px" src={message?.user?.pic}/>
                        <p className="received__message">
                           {message?.text}
                        </p>
                     </div>
                    ):
                    (
                      <div className="send" key={message?._id}>
                        <p className="send__message">
                           {message?.text}
                        </p>
                      </div>
                    )
                    )
                 }

               <div ref={messagesEndRef}/>
            </div>

            <form className="userchats__form" onSubmit={handleSubmit}>
                <div className="form__group">
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="chats__input" placeholder="Message..."/>
                  <input type="submit" className="send__btn" disabled={input === ""} value="Send"/>
                </div>
            </form>
        </div>
    );
};

export default UserChatsDesktop;