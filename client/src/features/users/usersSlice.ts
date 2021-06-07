import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersInitialState, UsersResponse } from "./usersSlice.types";

import axios from "axios";

export const fetchUsers = createAsyncThunk<UsersResponse,{token:string,searchTerm:string}>("users/fetchusers",async({token,searchTerm}) => {
    const res = await axios.get(`http://localhost:5000/users/${searchTerm}`,{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
})

const initialState:UsersInitialState = {
    users:[],
    status:"idle"
}

const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
    },
    extraReducers:(builder) => {
        builder.addCase(fetchUsers.pending,(state:UsersInitialState) => {
            state.status = "pending";
        })
        builder.addCase(fetchUsers.rejected,(state:UsersInitialState) => {
            state.status = "failed";
        })
        builder.addCase(fetchUsers.fulfilled,(state:UsersInitialState,action:PayloadAction<UsersResponse>) => {
             state.users = action.payload.users;
             state.status = "idle";
        })
      
    }
})

export default usersSlice.reducer;