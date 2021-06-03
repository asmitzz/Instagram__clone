import { useEffect } from "react";
import { fetchPosts } from "../../features/posts/postsSlice";
import { fetchSavedPosts } from "../../features/savedposts/savedpostsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Post from "../Post/Post";
import ProfileBox from "./components/ProfileBox";
import SuggestionBox from "./components/SuggestionBox";
import "./HomeContent.css";

const HomeContent = () => {
    const token = useAppSelector(state => state.auth.token);
    const posts = useAppSelector(state => state.posts.posts);
    const postsRequestStatus = useAppSelector(state => state.posts.status);
    const savedpostsRequestStatus = useAppSelector(state => state.savedposts.status);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
       if(postsRequestStatus === "idle" && token !== null){
           dispatch(fetchPosts({token}));
       }
       
    },[postsRequestStatus,token,dispatch])

    useEffect(() => {
        if(savedpostsRequestStatus === "idle" && token !== null){
            dispatch(fetchSavedPosts({token}));
         }
    },[savedpostsRequestStatus,token,dispatch])

    return (
        <div className="home__content">
            <div className="left__section">
                {
                   posts.map( post => (
                       <Post key={post._id} {...post} />
                  ))
                }
            </div>
            <div className="right__section">
                <ProfileBox/>
                <SuggestionBox/>
            </div>
        </div>
    );
};

export default HomeContent;