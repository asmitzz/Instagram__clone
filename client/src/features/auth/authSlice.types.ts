export type User = {
    _id:string;
    pic:string;
    username:string;
    fullname:string;
    private:boolean;
    website:string;
    bio:string;
}

export type AuthState = {
    token:string;
    login:boolean;
    user?:User;
}

export type AuthResponse = {
    token:string;
    login:boolean;
    user:User;
}