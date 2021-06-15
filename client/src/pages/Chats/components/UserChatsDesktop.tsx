import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { sendMessage, updateChat } from "../../../features/chats/chatsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { Chat } from "../../../features/chats/chatsSlice.types";
import { Link } from "react-router-dom";

import io from "socket.io-client";

let socket:any;
let endpoint = "https://insta-clone-10062000.herokuapp.com/";

const UserChatsDesktop = () => {

    const [input,setInput] = useState<string>("");
    const [typing,setTyping] = useState<boolean>(false);

    const messagesEndRef = useRef<any>(null);
    const typingRef = useRef<any>(null);

    const { chatId } = useParams();
    const { chats } = useAppSelector((state) => state.chats);
    const userId = useAppSelector((state) => state.auth.user?._id);
    const token = useAppSelector(state => state.auth.token);
    const dispatch = useAppDispatch();

    const chat = chats.find(chat => chat._id === chatId);
    const user = chat?.users.find( user => user._id !== userId );

    useEffect(() => {
       socket = io(endpoint)
       if(userId){
          socket.emit("joinRoom",chatId,userId)
       }
       socket.on("receiveMsg",(chat:Chat) => {
          dispatch(updateChat({chat}))
       })
       socket.on("typing",() => {
          setTyping(true)
       })
       socket.on("stopTyping",() => {
          setTyping(false)
       })
    },[chatId,userId,dispatch])

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView();
    },[chat?.messages])

    const handleSubmit = (e:React.SyntheticEvent) => {
      e.preventDefault();
      if( chat && input !=="" ){
        dispatch(sendMessage({ token,text:input,chatId:chat?._id }))
        .then(unwrapResult)
        .then((originalPromiseResult) => {
           socket.emit("sendMessage",chatId,originalPromiseResult.chat)
        });
        setInput("");
      }
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
       setInput(e.target.value)
       if(typingRef.current !== null){
          clearTimeout(typingRef.current)
       }
       socket.emit("typing",chatId);
       typingRef.current = setTimeout(() => {
         typingRef.current = null;
         socket.emit("stopTyping",chatId);
       },500)
    }
     
    return (
        <div className="userchats">
            <header >
               <Link to={`/viewprofile/${user?._id}`} className="userchats__header">
                 <img width="30px" className="user__pic" alt="users" height="30px" src={user?.pic}/>
                 <div className="username">{user?.username}</div>
               </Link>
            </header>

            <div className="chats">

                 {
                    chat?.messages.map(message => message?.user?._id !== userId ? (
                      <div className="received" key={message?._id}>
                        <Link to={`/viewprofile/${user?._id}`}>
                           <img width="30px" className="user__pic" alt="users" height="30px" src={message?.user?.pic}/>
                        </Link>
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
                {typing && <span className="typing"><strong>{user?.username}</strong> is typing...</span>}
                <div className="form__group">
                  <input type="text" value={input} onChange={handleChange} className="chats__input" placeholder="Message..."/>
                  <input type="submit" className="send__btn" disabled={input === ""} value="Send"/>
                </div>
            </form>
        </div>
    );
};

export default UserChatsDesktop;