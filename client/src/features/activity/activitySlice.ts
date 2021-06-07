import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivityResponse,ActivityInitialState } from "./activitySlice.types";

import axios from "axios";

export const fetchActivity = createAsyncThunk<ActivityResponse,{token:string}>("activity/fetchactivity",async({token}) => {
    const res = await axios.get("http://localhost:5000/activities",{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
});

export const confirmRequest = createAsyncThunk<ActivityResponse,{token:string}>("activity/fetchactivity",async({token}) => {
    const res = await axios.get("http://localhost:5000/activities",{
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
      
    }
})

export default savedpostsSlice.reducer;