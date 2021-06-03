import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostData,PostsIntialState, UploadPostResponse,UploadPostData } from "./posts.types";

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

export const uploadPost = createAsyncThunk("posts/uploadpost",async({file,caption,token}:UploadPostData) => {
    const formData = new FormData();
          formData.append("file",file);
          formData.append("caption",caption);

    const res = await axios.post<UploadPostResponse>("http://localhost:5000/posts",formData,{
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

        builder.addCase(uploadPost.fulfilled,(state:PostsIntialState,action:PayloadAction<UploadPostResponse>) => {
           state.posts.push(action.payload.post)
        })
    }
})

export default postSlice.reducer;