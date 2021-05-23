export type LoginState = {
    email:string;
    password:string;
}

export type LoginError = {
    email:boolean;
    password:boolean;
    disabled:boolean;
}