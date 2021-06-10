import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, ChatsInitialState, FetchChatsResponse } from "./chatsSlice.types";

import axios from "axios";

export const fetchChats = createAsyncThunk<FetchChatsResponse,{token:string}>("chats/fetchchats",async({token}) => {
    const res = await axios.get(`http://localhost:5000/chats`,{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
})

export const createChat = createAsyncThunk<{chat:Chat},{token:string,userId:string}>("chats/createChat",async({token,userId}) => {
    const res = await axios.post(`http://localhost:5000/chats/${userId}`,{},{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
})

export const sendMessage = createAsyncThunk<{chat:Chat},{token:string,text:string,chatId:string}>("chats/sendmessage",async({token,text,chatId}) => {
    const res = await axios.post(`http://localhost:5000/chats/message/${chatId}`,{ text },{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
})

const initialState:ChatsInitialState = {
    chats:[],
    status:"idle"
}

const chatsSlice = createSlice({
    name:"chats",
    initialState,
    reducers:{
        updateChat:(state:ChatsInitialState,action:PayloadAction<{chat:Chat}>) => {
            const { chat } = action.payload;
            const chatIndex = state.chats.findIndex(c => c._id === chat._id);
            state.chats[chatIndex] = chat;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchChats.pending,(state:ChatsInitialState) => {
            state.status = "pending";
        })
        builder.addCase(fetchChats.rejected,(state:ChatsInitialState) => {
            state.status = "failed";
        })
        builder.addCase(fetchChats.fulfilled,(state:ChatsInitialState,action:PayloadAction<FetchChatsResponse>) => {
             state.chats = action.payload.chats;
             state.status = "succeeded";
        })
        builder.addCase(createChat.fulfilled,(state:ChatsInitialState,action:PayloadAction<{chat:Chat}>) => {
           const { chat } = action.payload;
           state.chats.push(chat);
        })
    }
})

export const {updateChat} = chatsSlice.actions;

export default chatsSlice.reducer;