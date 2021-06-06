import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginState } from "../../auth/login/Login.types";
import { SignupState } from "../../auth/signup/signup.types";
import { ServerError } from "../../generic.types";
import { AuthState,AuthResponse } from "./authSlice.types";

let user:AuthState = JSON.parse(localStorage?.getItem("token")||"{}")
  
const initialState:AuthState = user && user.token ? user : {
    token:"",
    login:false
}

export const signupUser = createAsyncThunk("posts/signup",async(state:SignupState,thunkApi) => {
        try {
            const res = await axios.post<{success:boolean}>("http://localhost:5000/signup",state);
            return res.data;
        } catch (error) {
            if(error.response.status === 422){
               return thunkApi.rejectWithValue(error.response.data as ServerError);
            }
            return thunkApi.rejectWithValue({ message:"something went wrong" });
        }
})

export const loginUser = createAsyncThunk("posts/login",async(state:LoginState,thunkApi) => {
    try {
        const res = await axios.post<AuthResponse>("http://localhost:5000/signin",state);
        return res.data;
    } catch (error) {
        if(error.response.status === 401){
           return thunkApi.rejectWithValue(error.response.data as ServerError);
        }
        return thunkApi.rejectWithValue({ message:"something went wrong" });
    }
})

export const checkAuth = createAsyncThunk("posts/checkauth",async(token:string) => {
       const res = await axios.get<AuthResponse>("http://localhost:5000/protected",{headers:{ authorization:`Bearer ${token}` }});
       return res.data;
})

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       logout:() => {
           return { login:false,token:"" }
       }
    },
    extraReducers:(builder) => {
       builder.addCase(loginUser.fulfilled,(state:AuthState,action:PayloadAction<AuthResponse|ServerError>) => {
            if("token" in action.payload){
                const { token,login,user } = action.payload;
                state.token = token;
                state.login = login;
                state.user = user;
                localStorage.setItem("token",JSON.stringify({token}));
            }
       })

       builder.addCase(checkAuth.fulfilled,(state:AuthState,action:PayloadAction<AuthResponse|ServerError>) => {
        if("token" in action.payload){
            const { token,login,user } = action.payload;
            state.token = token;
            state.login = login;
            state.user = user;
        }
    })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;