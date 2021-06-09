import { Status } from "../../generic.types"

export type User = {
    _id:string;
    pic:string;
    username:string;
}

export type Message = {
    _id:string;
    user:User;
    text:string;
}

export type Chat = {
    _id:string;
    users:User[];
    messages:Message[];
}

export type ChatsInitialState = {
    chats:Chat[];
    status:Status;
}

export type FetchChatsResponse = {
    chats:Chat[];
}