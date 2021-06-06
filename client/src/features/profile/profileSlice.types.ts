import { Status } from "../../generic.types"

export type FollowersOrFollowing = {
    _id:string;
    username:string;
    fullname:string;
    pic:string;
}

export type FollowersResponse = {
    followers:FollowersOrFollowing[]
}

export type FollowingResponse = {
    following:FollowersOrFollowing[]
}

export type Connection = {
    followers:string[];
    following:string[];
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

export type UserProfile = {
    _id:string;
    username:string;
    fullname:string;
    pic:string;
    website:string;
    bio:string;
    private:boolean;
}

export type Post = {
    _id:string;
    file:string;
    postedBy:string;
}

export type ViewProfileData = {
    userposts:Post[];
    connections:Connection;
    profile:UserProfile;
}