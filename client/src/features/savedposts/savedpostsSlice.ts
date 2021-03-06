import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SavedPostsInitialState, SavedPostsResponse } from "./savedposts.types";

import axios from "axios";
import { BASE_URL } from "../../constants";

export const fetchSavedPosts = createAsyncThunk<SavedPostsResponse,{token:string}>("savedposts/fetchsavedposts",async({token}) => {
    const res = await axios.get(`${BASE_URL}/savedposts`,{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
})

export const savedPostPressed = createAsyncThunk<SavedPostsResponse,{token:string,postId:string}>("/savedposts/updatesavedposts",async({token,postId}) => {
    const res = await axios.post(`${BASE_URL}/savedposts/${postId}`,{},{
        headers:{ authorization:`Bearer ${token}` }
    });
    return res.data;
})

const initialState:SavedPostsInitialState = {
    posts:[],
    status:"idle"
}

const savedpostsSlice = createSlice({
    name:"savedposts",
    initialState,
    reducers:{
    },
    extraReducers:(builder) => {
        builder.addCase(fetchSavedPosts.pending,(state:SavedPostsInitialState) => {
            state.status = "pending";
        })
        builder.addCase(fetchSavedPosts.rejected,(state:SavedPostsInitialState) => {
            state.status = "failed";
        })
        builder.addCase(fetchSavedPosts.fulfilled,(state:SavedPostsInitialState,action:PayloadAction<SavedPostsResponse>) => {
             state.posts = action.payload.posts;
             state.status = "succeeded";
        })
        builder.addCase(savedPostPressed.fulfilled,(state:SavedPostsInitialState,action:PayloadAction<SavedPostsResponse>) => {
            state.posts = action.payload.posts;
        })
    }
})

export default savedpostsSlice.reducer;