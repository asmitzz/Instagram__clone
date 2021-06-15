import { Status } from "../../generic.types";

export type Post = {
    _id:string;
    file:string;
}

export type SavedPostsInitialState = {
    posts:Post[];
    status:Status;
}

export type SavedPostsResponse = {
    posts:Post[];
}