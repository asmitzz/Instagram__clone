import { AuthState, AuthAction } from "../types/auth.types";

const initialState:AuthState = {
    token:null,
    login:false,
    user:null
}

export const authReducer = (state=initialState,action:AuthAction) => {
    switch(action.type){
       case "LOGIN":
       return {...state,...action.payload}
       case "LOGOUT":
       return {...state,...action.payload}
       default:
       return state
    }
}