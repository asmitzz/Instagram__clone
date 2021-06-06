import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostData,PostsIntialState, PostResponse,UploadPostData, PostWithPopulateComment } from "./posts.types";

import axios from "axios";

const initialState:PostsIntialState = {
    posts:[],
    status:"idle"
};

export const fetchPosts = createAsyncThunk<PostData,{token:string}>("posts/fetchPosts",async({token}) => {
    const res = await axios.get("http://localhost:5000/posts",{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
})

export const fetchComments = createAsyncThunk<{post:PostWithPopulateComment},{token:string,postId:string}>("posts/fetchcomments",async({token,postId},thunkApi) => {
    const res = await axios.get(`http://localhost:5000/posts/${postId}/comment`,{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
})

export const uploadPost = createAsyncThunk<PostResponse,UploadPostData>("posts/uploadpost",async({file,caption,token}) => {
    const formData = new FormData();
          formData.append("file",file);
          formData.append("caption",caption);

    const res = await axios.post("http://localhost:5000/posts",formData,{
            headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
})

export const likePressed = createAsyncThunk<PostResponse,{token:string,postId:string}>("posts/likepressed",async({token,postId}) => {
    const res = await axios.post(`http://localhost:5000/posts/${postId}/like`,{},{
         headers:{ authorization:`Bearer ${token}` }
    });
    return res.data;
})

export const commentPressed = createAsyncThunk<PostResponse,{token:string,comment:string,postId:string}>("posts/commentpressed",async({token,comment,postId}) => {
    const res = await axios.post(`http://localhost:5000/posts/${postId}/comment`,{comment},{
         headers:{ authorization:`Bearer ${token}` }
    });
    return res.data;
})

const postsSlice = createSlice({
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

        builder.addCase(uploadPost.fulfilled,(state:PostsIntialState,action:PayloadAction<PostResponse>) => {
           state.posts.push(action.payload.post)
        })

        builder.addCase(likePressed.fulfilled,(state:PostsIntialState,action:PayloadAction<PostResponse>) => {
            const postIndex = state.posts.findIndex((post) => post._id === action.payload.post._id );
            state.posts[postIndex] = action.payload.post;
        })

        builder.addCase(commentPressed.fulfilled,(state:PostsIntialState,action:PayloadAction<PostResponse>) => {
            const postIndex = state.posts.findIndex((post) => post._id === action.payload.post._id );
            state.posts[postIndex] = action.payload.post;
        })

    }
})

export default postsSlice.reducer;