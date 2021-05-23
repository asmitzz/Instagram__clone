export type SignupState = {
    email:string;
    fullname:string;
    username:string;
    password:string;
}

export type SignupError = {
    email:boolean;
    fullname:boolean;
    username:boolean;
    password:boolean;
    disabled:boolean;
}