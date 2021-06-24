import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivityResponse,ActivityInitialState, ConfirmRequestResponse } from "./activitySlice.types";

import axios from "axios";

export const fetchActivity = createAsyncThunk<ActivityResponse,{token:string}>("activity/fetchactivity",async({token}) => {
    const res = await axios.get("https://insta-clone-10062000.herokuapp.com/activities",{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
});

export const confirmRequest = createAsyncThunk<ConfirmRequestResponse,{token:string,userId:string}>("activity/confirmrequest",async({token,userId}) => {
    const res = await axios.post(`https://insta-clone-10062000.herokuapp.com/activities/requests/${userId}`,{},{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
});

export const deleteRequest = createAsyncThunk<ActivityResponse,{token:string,userId:string}>("activity/deleterequest",async({token,userId}) => {
    const res = await axios.delete(`https://insta-clone-10062000.herokuapp.com/activities/requests/${userId}`,{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
});

const initialState:ActivityInitialState = {
    activities:null,
    status:"idle"
}

const savedpostsSlice = createSlice({
    name:"activity",
    initialState,
    reducers:{
        resetActivities:(state:ActivityInitialState) => {
            state.status = "idle"
            state.activities = null
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchActivity.pending,(state:ActivityInitialState) => {
            state.status = "pending";
        })
        builder.addCase(fetchActivity.rejected,(state:ActivityInitialState) => {
            state.status = "failed";
        })
        builder.addCase(fetchActivity.fulfilled,(state:ActivityInitialState,action:PayloadAction<ActivityResponse>) => {
             state.activities = action.payload.activities;
             state.status = "succeeded";
        })

        builder.addCase(confirmRequest.fulfilled,(state:ActivityInitialState,action:PayloadAction<ConfirmRequestResponse>) => {
            state.activities = action.payload.activities;
        })

        builder.addCase(deleteRequest.fulfilled,(state:ActivityInitialState,action:PayloadAction<ActivityResponse>) => {
            state.activities = action.payload.activities;
        })
    }
})

export const { resetActivities } = savedpostsSlice.actions;

export default savedpostsSlice.reducer;