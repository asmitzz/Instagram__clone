import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postsReducer from "../features/posts/postsSlice";
import savedpostsReducer from "../features/savedposts/savedpostsSlice";
import profileReducer from "../features/profile/profileSlice";
import activityReducer from "../features/activity/activitySlice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        posts:postsReducer,
        savedposts:savedpostsReducer,
        profile:profileReducer,
        activity:activityReducer
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