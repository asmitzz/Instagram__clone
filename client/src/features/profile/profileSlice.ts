import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Connection, FollowersResponse, FollowingResponse, InitialProfileState, Profile, ProfileData, UpdateConnectionsResponse, ViewProfileData } from "./profileSlice.types";

import axios from "axios";
import { ServerError } from "../../generic.types";

const initialState:InitialProfileState = {
    profile:{
        _id:"",
        pic:"",
        username:"",
        fullname:"",
        bio:"",
        website:"",
        gender:"",
        private:false,
        email:""
    },
    userposts:[],
    connections:{
        followers:[],
        following:[]
    },
    status:"idle"
}

export const fetchProfile = createAsyncThunk<ProfileData,{token:string}>("profile/fetchprofile",async({token}) => {
    const res = await axios.get("https://insta-clone-10062000.herokuapp.com/profile",{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
});

export const fetchViewProfile = createAsyncThunk<ViewProfileData,{token:string,userId:string}>("profile/fetchviewprofile",async({token,userId}) => {
    const res = await axios.get(`https://insta-clone-10062000.herokuapp.com/profile/${userId}`,{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
});

export const fetchFollowers = createAsyncThunk<FollowersResponse,{token:string,userId:string}>("profile/fetchfollowers",async({token,userId}) => {
    const res = await axios.get(`https://insta-clone-10062000.herokuapp.com/connections/followers/${userId}`,{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
});

export const fetchFollowing = createAsyncThunk<FollowingResponse,{token:string,userId:string}>("profile/fetchfollowing",async({token,userId}) => {
    const res = await axios.get(`https://insta-clone-10062000.herokuapp.com/connections/following/${userId}`,{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
});

export const updateConnections = createAsyncThunk<UpdateConnectionsResponse,{token:string,userId:string}>("profile/updateconnections",async({token,userId}) => {
    const res = await axios.post(`https://insta-clone-10062000.herokuapp.com/connections/${userId}`,{},{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
});

export const updateProfile = createAsyncThunk<{profile:Profile},{token:string,data:Profile,file:File|null}>("profile/update",async({token,data,file},thunkApi) => {
    
    const profile = JSON.stringify(data)
    
    const formData = new FormData();
    if(file){
       formData.append("file",file);
    }
    formData.append("data",profile);
    
    try {
        const res = await axios.post(`https://insta-clone-10062000.herokuapp.com/profile/update`,formData,{
            headers:{ "Authorization":`Bearer ${token}` }
       });
       return res.data;
     } catch (error) {
         if(error.response.status === 422 || error.response.status === 400){
            return thunkApi.rejectWithValue(error.response.data as ServerError);
         }
         return thunkApi.rejectWithValue({ message:"something went wrong" });
     }
});

const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{
        UpdateConnections:(state,action:PayloadAction<{connections:Connection}>) => {
            state.connections = action.payload.connections
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchProfile.pending,(state:InitialProfileState) => {
            state.status = "pending";
        })
        builder.addCase(fetchProfile.rejected,(state:InitialProfileState) => {
            state.status = "failed";
        })
        builder.addCase(fetchProfile.fulfilled,(state:InitialProfileState,action:PayloadAction<ProfileData>) => {
             const {userposts,profile,connections} = action.payload;
           
             state.profile = profile;
             state.connections = connections;
             state.userposts = userposts;
             state.status = "succeeded";
        })

        builder.addCase(updateProfile.fulfilled,(state:InitialProfileState,action:PayloadAction<{profile:Profile}>) => {
            state.profile = action.payload.profile
        })
    }
})

export const { UpdateConnections } = profileSlice.actions;

export default profileSlice.reducer;