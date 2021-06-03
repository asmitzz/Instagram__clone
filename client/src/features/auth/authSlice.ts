import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginState } from "../../auth/login/Login.types";
import { SignupState } from "../../auth/signup/signup.types";
import { AuthState,AuthResponse } from "./authSlice.types";

let user:AuthState = JSON.parse(localStorage?.getItem("token")||"{}")

const initialState:AuthState = user && user.token && user.login ? user : {
    token:"",
    login:false
}

export const signupUser = createAsyncThunk("posts/signup",async(state:SignupState) => {
    const res = await axios.post<{success:boolean}>("http://localhost:5000/signup",state);
    return res.data;
})

export const loginUser = createAsyncThunk("posts/login",async(state:LoginState) => {
    const res = await axios.post<AuthResponse>("http://localhost:5000/signin",state);
    return res.data;
})

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       login:(state,action:PayloadAction<AuthResponse>) => {
           const { token,login,user } = action.payload;
           return {...state,token,login,user}
       },
       logout:() => {
           return { login:false,token:"" }
       }
    }
});

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;