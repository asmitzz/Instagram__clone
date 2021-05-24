export type User = {
    _id:string
}

export type AuthState = {
    token:string|null,
    login:boolean,
    user?:User
}

export type AuthAction = 
|{ type:"LOGIN",payload:{ token:string;login:boolean;user:User; } }
|{ type:"LOGOUT" }