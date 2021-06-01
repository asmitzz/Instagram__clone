import { type } from "os";

export type User = {
    _id:string;
    pic:string;
    username:string;
}

export type Comment = {
    text:string;
    user:User;
}

export type Post = {
    _id:string;
    postedBy:User;
    caption:string;
    comments:Comment[];
}

export type PostData = {
    posts:Post[];
}

export type PostsIntialState = {
    posts:Post[];
    status:"idle" | "pending" | "succeeded" | "failed"
}