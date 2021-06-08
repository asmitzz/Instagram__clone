import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivityResponse,ActivityInitialState, ConfirmRequestResponse } from "./activitySlice.types";

import axios from "axios";

export const fetchActivity = createAsyncThunk<ActivityResponse,{token:string}>("activity/fetchactivity",async({token}) => {
    const res = await axios.get("http://localhost:5000/activities",{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
});

export const confirmRequest = createAsyncThunk<ConfirmRequestResponse,{token:string,userId:string}>("activity/confirmrequest",async({token,userId}) => {
    const res = await axios.post(`http://localhost:5000/activities/requests/${userId}`,{},{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
});

export const deleteRequest = createAsyncThunk<ActivityResponse,{token:string,userId:string}>("activity/deleterequest",async({token,userId}) => {
    const res = await axios.delete(`http://localhost:5000/activities/requests/${userId}`,{
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

export default savedpostsSlice.reducer;