import { useEffect } from "react";
import { fetchPosts } from "../../features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Post from "../Post/Post";
import ProfileBox from "./components/ProfileBox";
import SuggestionBox from "./components/SuggestionBox";
import "./HomeContent.css";

const HomeContent = () => {
    const token = useAppSelector(state => state.auth.token);
    const postStatus = useAppSelector(state => state.posts.status);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
       if(postStatus === "idle" && token !== null){
           dispatch(fetchPosts(token))
       }
    },[token,postStatus,dispatch])

    return (
        <div className="home__content">
            <div className="left__section">
                <Post/>
                <Post/>
            </div>
            <div className="right__section">
                <ProfileBox/>
                <SuggestionBox/>
            </div>
        </div>
    );
};

export default HomeContent;