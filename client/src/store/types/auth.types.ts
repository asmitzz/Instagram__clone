export type User = {
    _id:string
}

export type AuthState = {
    token:string|null,
    login:boolean,
    user:User|null
}

export type AuthAction = 
|{ type:"LOGIN",payload:{ token:string;login:true;user:User; } }
|{ type:"LOGOUT",payload:{ token:null;login:false;user:null; } }