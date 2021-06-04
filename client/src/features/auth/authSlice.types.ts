export type User = {
    _id:string;
    pic:string;
    username:string;
    fullname:string;
    private:boolean;
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