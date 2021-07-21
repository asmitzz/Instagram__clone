import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginState } from "../../auth/login/Login.types";
import { SignupState } from "../../auth/signup/signup.types";
import { BASE_URL } from "../../constants";
import { ServerError } from "../../generic.types";
import { AuthState,AuthResponse } from "./authSlice.types";

let user:AuthState = JSON.parse(localStorage?.getItem("token")||"{}")
  
const initialState:AuthState = user && user.token ? user : {
    token:"",
    login:false,
    user:{
        _id:""
    }
}

export const signupUser = createAsyncThunk("auth/signup",async(state:SignupState,thunkApi) => {
        try {
            const res = await axios.post<{success:boolean}>(`${BASE_URL}/signup`,state);
            return res.data;
        } catch (error) {
            if(error.response.status === 422){
               return thunkApi.rejectWithValue(error.response.data as ServerError);
            }
            return thunkApi.rejectWithValue({ message:"something went wrong" });
        }
})

export const loginUser = createAsyncThunk("auth/login",async(state:LoginState,thunkApi) => {
    try {
        const res = await axios.post<AuthResponse>(`${BASE_URL}/signin`,state);
        return res.data;
    } catch (error) {
        if(error.response.status === 401 || error.response.status === 422){
           return thunkApi.rejectWithValue(error.response.data as ServerError);
        }
        return thunkApi.rejectWithValue({ message:"something went wrong" });
    }
})

export const checkAuth = createAsyncThunk("auth/checkauth",async(token:string) => {
       const res = await axios.get<AuthResponse>(`${BASE_URL}/protected`,{headers:{ authorization:`Bearer ${token}` }});
       return res.data;
})

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       logout:(state) => {
           localStorage.removeItem("token");
           state.token = "";
           state.login = false;
           state.user = {
              _id:""
           }
       }
    },
    extraReducers:(builder) => {
       builder.addCase(loginUser.fulfilled,(state:AuthState,action:PayloadAction<AuthResponse|ServerError>) => {
            if("token" in action.payload){
                const { token,login,user } = action.payload;
                state.token = token;
                state.login = login;
                state.user = user;
                localStorage.setItem("token",JSON.stringify({token,login:true}));
            }
       })

       builder.addCase(checkAuth.fulfilled,(state:AuthState,action:PayloadAction<AuthResponse|ServerError>) => {
        if("token" in action.payload){
            const { token,login,user } = action.payload;
            state.token = token;
            state.login = login;
            state.user = user;
            localStorage.setItem("token",JSON.stringify({token,login:true}));
        }
       })

       builder.addCase(checkAuth.rejected,(state:AuthState) => {
            state.token = "";
            state.login = false;
            state.user = {
                _id:""
            };
            localStorage.removeItem("token");
       })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;