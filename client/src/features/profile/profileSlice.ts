import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialProfileState, ProfileData, ViewProfileData } from "./profileSlice.types";

import axios from "axios";

const initialState:InitialProfileState = {
    userposts:[],
    connections:{
        followers:[],
        following:[]
    },
    status:"idle"
}

export const fetchProfile = createAsyncThunk<ProfileData,{token:string}>("profile/fetchprofile",async({token}) => {
    const res = await axios.get("http://localhost:5000/profile",{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
})

export const fetchViewProfile = createAsyncThunk<ViewProfileData,{token:string,userId:string}>("profile/fetchprofile",async({token,userId}) => {
    const res = await axios.get(`http://localhost:5000/profile/${userId}`,{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
})

const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{
    },
    extraReducers:(builder) => {
        builder.addCase(fetchProfile.pending,(state:InitialProfileState) => {
            state.status = "pending";
        })
        builder.addCase(fetchProfile.rejected,(state:InitialProfileState) => {
            state.status = "failed";
        })
        builder.addCase(fetchProfile.fulfilled,(state:InitialProfileState,action:PayloadAction<ProfileData>) => {
             state.status = "succeeded";
             state.connections = action.payload.connections;
             state.userposts = action.payload.userposts;
        })
    }
})

export default profileSlice.reducer;