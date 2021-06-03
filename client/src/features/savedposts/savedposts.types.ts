import { Status } from "../../generic.types";

export type SavedPostsInitialState = {
    posts:string[];
    status:Status;
}

export type SavedPostsResponse = {
    posts:string[];
    message:string;
}