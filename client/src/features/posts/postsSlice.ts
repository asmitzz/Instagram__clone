import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostData,PostsIntialState } from "./posts.types";
import axios from "axios";

const initialState:PostsIntialState = {
    posts:[],
    status:"idle"
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts",async(token:string) => {
    const res = await axios.get<PostData>("http://localhost:5000/posts",{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
})

const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
    },
    extraReducers:(builder) => {
        builder.addCase(fetchPosts.rejected,(state:PostsIntialState) => {
            state.status = "failed"
        })

        builder.addCase(fetchPosts.pending,(state:PostsIntialState) => {
            state.status = "pending"
        })

        builder.addCase(fetchPosts.fulfilled,(state:PostsIntialState,action:PayloadAction<PostData>) => {
            state.status = "succeeded"
            state.posts = action.payload.posts
        })
    }
})

export default postSlice.reducer;