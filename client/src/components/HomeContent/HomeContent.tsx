import { useEffect } from "react";
import { fetchPosts } from "../../features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Post from "../Post/Post";
import ProfileBox from "./components/ProfileBox";
import SuggestionBox from "./components/SuggestionBox";
import "./HomeContent.css";

const HomeContent = () => {
    const token = useAppSelector(state => state.auth.token);
    const {status,posts} = useAppSelector(state => state.posts);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
       if(status === "idle" && token !== null){
           dispatch(fetchPosts(token))
       }
    },[token,status,dispatch])

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