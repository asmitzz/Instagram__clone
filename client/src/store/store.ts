import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postsReducer from "../features/posts/postsSlice";
import savedpostsReducer from "../features/savedposts/savedpostsSlice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        posts:postsReducer,
        savedposts:savedpostsReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;