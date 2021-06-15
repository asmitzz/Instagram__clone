import { Status } from "../../generic.types"

export type User = {
    _id:string;
}

export type AuthState = {
    token:string;
    login:boolean;
    user:User;
}

export type AuthResponse = {
    token:string;
    login:boolean;
    user:User;
}