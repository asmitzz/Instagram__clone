export type LoginState = {
    emailOrUsername:string;
    password:string;
}

export type LoginError = {
    emailOrUsername:boolean;
    password:boolean;
    disabled:boolean;
}