
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { fetchPosts, setLoading } from "../../features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const usePaginatedPosts = (page:number) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);

    useEffect(() => {
       dispatch(setLoading({loading:true}))
       try {
          dispatch(fetchPosts({token,page}))
          .then(unwrapResult)
          .then(() => {
            dispatch(setLoading({loading:false}))
          })
       } catch (error) {
          
       }

    },[page,dispatch,token])

    return null
}

export default usePaginatedPosts;
