import { Status } from "../../generic.types";

export type Comment = {
    _id:string;
    text:string;
    user:string;
    likes:string[];
    replies:string[];
    createdAt:string;
}

export type Post = {
    _id:string;
    file:string;
    postedBy:string;
    caption:string;
    likes:string[];
    comments:Comment[];
    createdAt:string;
}

export type SavedPostsInitialState = {
    posts:Post[];
    status:Status;
}

export type SavedPostsResponse = {
    posts:Post[];
}