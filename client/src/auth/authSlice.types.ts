export type User = {
    _id:string
}

export type AuthState = {
    token:string|null,
    login:boolean,
    user?:User
}

export type AuthAction = { token:string;login:boolean;user:User; } 

export type AuthResponse = {
    token:string;
    login:boolean;
    user:User
}