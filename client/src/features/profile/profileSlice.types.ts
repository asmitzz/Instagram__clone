import { Status } from "../../generic.types"
import { Post, User } from "../posts/posts.types"

export type Connection = {
    followers:User[];
    following:User[];
}

export type InitialProfileState = {
    userposts:Post[];
    connections:Connection;
    status:Status;
}

export type ProfileData = {
    userposts:Post[];
    connections:Connection;
}