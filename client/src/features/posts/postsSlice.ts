import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostData,PostsIntialState, PostResponse,UploadPostData, PostWithPopulateComment } from "./posts.types";

import axios from "axios";
import { BASE_URL } from "../../constants";

const initialState:PostsIntialState = {
    posts:[],
    status:"idle",
    hasMore:true,
    page:1,
    loading:true
};

export const fetchPosts = createAsyncThunk<PostData,{token:string,page:number}>("posts/fetchPosts",async({token,page}) => {
    const res = await axios.get(`${BASE_URL}/posts?page=${page}&limit=5`,{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
})

export const fetchComments = createAsyncThunk<{post:PostWithPopulateComment},{token:string,postId:string}>("posts/fetchcomments",async({token,postId},thunkApi) => {
    const res = await axios.get(`${BASE_URL}/posts/${postId}/comment`,{
         headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
})

export const uploadPost = createAsyncThunk<PostResponse,UploadPostData>("posts/uploadpost",async({file,caption,token}) => {
    const formData = new FormData();
          formData.append("file",file);
          formData.append("caption",caption);

    const res = await axios.post(`${BASE_URL}/posts`,formData,{
            headers:{ "Authorization":`Bearer ${token}` }
    });
    return res.data;
})

export const likePressed = createAsyncThunk<PostResponse,{token:string,postId:string}>("posts/likepressed",async({token,postId}) => {
    const res = await axios.post(`${BASE_URL}/posts/${postId}/like`,{},{
         headers:{ authorization:`Bearer ${token}` }
    });
    return res.data;
})

export const commentPressed = createAsyncThunk<PostResponse,{token:string,comment:string,postId:string}>("posts/commentpressed",async({token,comment,postId}) => {
    const res = await axios.post(`${BASE_URL}/posts/${postId}/comment`,{comment},{
         headers:{ authorization:`Bearer ${token}` }
    });
    return res.data;
})

export const fetchPost = createAsyncThunk<PostResponse,{token:string,postId:string}>("posts/fetchpost",async({token,postId}) => {
    const res = await axios.get(`${BASE_URL}/posts/${postId}`,{
         headers:{ authorization:`Bearer ${token}` }
    });
    return res.data;
})

const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        increasePostsPageNumber:(state:PostsIntialState) => {
           state.page = state.page + 1;
        },
        setLoading:(state:PostsIntialState,action:PayloadAction<{loading:boolean}>) => {
            state.loading = action.payload.loading;
        }
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
            state.hasMore = action.payload.posts.length > 0
            state.posts = state.posts.concat(action.payload.posts)
        })

        builder.addCase(uploadPost.fulfilled,(state:PostsIntialState,action:PayloadAction<PostResponse>) => {
           state.posts.unshift(action.payload.post)
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

export const {setLoading,increasePostsPageNumber} = postsSlice.actions;

export default postsSlice.reducer;