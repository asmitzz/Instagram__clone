import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthAction, AuthState } from "./authSlice.types";

let user:AuthState = JSON.parse(localStorage?.getItem("token")||"{}")

const initialState:AuthState = user && user.token && user.login ? user : {
    token:null,
    login:false
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       login:(state,action:PayloadAction<AuthAction>) => {
           const { token,login,user } = action.payload;
           return {...state,token,login,user}
       },
       logout:() => {
           return { login:false,token:null }
       }
    }
});

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;