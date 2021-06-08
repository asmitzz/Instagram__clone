import { useEffect } from "react";
import { fetchPosts } from "../../features/posts/postsSlice";
import { fetchProfile } from "../../features/profile/profileSlice";
import { fetchSavedPosts } from "../../features/savedposts/savedpostsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Post from "../Post/Post";
import ProfileBox from "./components/ProfileBox";
import "./HomeContent.css";

const HomeContent = () => {
    const token = useAppSelector(state => state.auth.token);
    const posts = useAppSelector(state => state.posts.posts);
    const postsRequestStatus = useAppSelector(state => state.posts.status);
    const savedpostsRequestStatus = useAppSelector(state => state.savedposts.status);
    const profileRequestStatus = useAppSelector(state => state.profile.status);

    const dispatch = useAppDispatch();
    
    useEffect(() => {
       if(postsRequestStatus === "idle"){
           dispatch(fetchPosts({token}));
       }
       
    },[postsRequestStatus,token,dispatch])

    useEffect(() => {
        if(savedpostsRequestStatus === "idle"){
            dispatch(fetchSavedPosts({token}));
         }
    },[savedpostsRequestStatus,token,dispatch])

    useEffect(() => {
        if(profileRequestStatus === "idle"){
            dispatch(fetchProfile({token}))
        }
    },[dispatch,profileRequestStatus,token])

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
            </div>
        </div>
    );
};

export default HomeContent;