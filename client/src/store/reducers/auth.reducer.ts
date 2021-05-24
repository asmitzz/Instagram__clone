import { AuthState, AuthAction } from "../types/authReducer.types";

let auth:AuthState = JSON.parse(localStorage?.getItem("token")||"{}")

const initialState:AuthState =  (auth && auth.login && auth.token) ? auth :  {
    token:null,
    login:false,
}

export const authReducer = (state=initialState,action:AuthAction) => {
    switch(action.type){
       case "LOGIN":
       return { login:true,token:action.payload.token,user:action.payload.user }
       case "LOGOUT":
       return { login:false,token:null }
       default:
       return state;
    }
}