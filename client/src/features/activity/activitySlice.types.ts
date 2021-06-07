import { Status } from "../../generic.types";

export type User = {
    _id:string;
    username:string;
    pic:string;
}

export type Activity = {
    _id:string;
    user:User;
    text:string;
    file?:string;
}

export type Activities = {
    _id:string;
    user:User;
    requests:User[];
    activity:Activity[];
}

export type ActivityResponse = {
    activities:Activities;
}

export type ActivityInitialState = {
    activities:Activities|null;
    status:Status;
}