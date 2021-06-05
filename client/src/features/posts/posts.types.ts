import { Status } from "../../generic.types"

export type User = {
    _id:string;
    pic:string;
    username:string;
    fullname:string;
}

export type Reply = {
    _id:string;
    text:string;
    user:User;
    likes:string[];
}

export type Comment = {
    _id:string;
    text:string;
    user:User;
    likes:string[];
    replies:Reply;
    createdAt:string;
}

export type PostWithComments = {
    _id:string;
    file:string;
    postedBy:User;
    caption:string;
    likes:string[];
    comments:Comment[];
    createdAt:string;
}

export type Post = {
    _id:string;
    file:string;
    postedBy:User;
    caption:string;
    likes:string[];
    comments:string[];
    createdAt:string;
}

export type PostData = {
    posts:Post[];
}

export type PostsIntialState = {
    posts:Post[];
    status:Status
}

export type PostResponse = {
    message:string;
    post:Post;
}

export type UploadPostData = {
    file:File;
    caption:string;
    token:string;
}