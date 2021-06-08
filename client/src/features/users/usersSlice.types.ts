import { Status } from "../../generic.types";

export type User = {
    _id:string;
    pic:string;
    username:string;
    fullname:string;
}

export type UsersInitialState = {
    users:User[];
    status:Status;
};

export type UsersResponse = {
    users:User[];
};