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

export type Profile = {
    _id:string;
    pic:string;
    username:string;
    fullname:string;
    bio:string;
    website:string;
    gender:string;
    private:boolean;
    email:string;
}

export type InitialProfileState = {
    profile:Profile;
    userposts:Post[];
    connections:Connection;
    status:Status;
}

export type ProfileData = {
    profile:Profile;
    userposts:Post[];
    connections:Connection;
}

export type Post = {
    _id:string;
    file:string;
    postedBy:string;
}

export type UserActivity = {
     requests:string[];
}

export type ViewProfileData = {
    userposts:Post[];
    connections:Connection;
    profile:Profile;
    activities:UserActivity;
}

export type UpdateConnectionsResponse = {
    yourconnections:Connection;
    userconnections:Connection;
    activities:UserActivity;
}