import { Post } from "../../features/posts/posts.types";

export type UploadPostResponse = {
    message:boolean;
    post:Post;
}

export type PostData = {
    file:File;
    caption:string;
}