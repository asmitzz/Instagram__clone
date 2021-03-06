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
    user:string;
    likes:string[];
    replies:Reply;
    createdAt:string;
}

export type PopulateComment = {
    _id:string;
    text:string;
    user:User;
    likes:string[];
    replies:Reply;
    createdAt:string;
}

export type PostWithPopulateComment = {
    _id:string;
    file:string;
    postedBy:User;
    caption:string;
    likes:string[];
    comments:PopulateComment[];
    createdAt:string;
}

export type Post = {
    _id:string;
    file:string;
    postedBy:User;
    caption:string;
    likes:string[];
    comments:Comment[];
    createdAt:string;
    lastElementRef?:any;
}

export type PostData = {
    posts:Post[];
}

export type PostsIntialState = {
    posts:Post[];
    status:Status;
    hasMore:boolean;
    page:number;
    loading:boolean;
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