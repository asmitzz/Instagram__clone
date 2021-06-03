import { Status } from "../../generic.types"

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
    file:string;
    postedBy:User;
    caption:string;
    likes:string[];
    comments:Comment[];
    updatedAt:"string";
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