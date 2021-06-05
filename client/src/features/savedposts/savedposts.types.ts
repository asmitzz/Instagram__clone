import { Status } from "../../generic.types";
import { Post } from "../posts/posts.types";

export type SavedPostsInitialState = {
    posts:Post[];
    status:Status;
}

export type SavedPostsResponse = {
    posts:Post[];
}