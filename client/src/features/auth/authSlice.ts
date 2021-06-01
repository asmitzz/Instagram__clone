import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../../services/auth/auth.services.types";
import { AuthState } from "./authSlice.types";

let user:AuthState = JSON.parse(localStorage?.getItem("token")||"{}")

const initialState:AuthState = user && user.token && user.login ? user : {
    token:null,
    login:false
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       login:(state,action:PayloadAction<AuthResponse>) => {
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