export type User = {
    _id:string
}

export type AuthState = {
    token:string|null,
    login:boolean,
    user?:User,
}