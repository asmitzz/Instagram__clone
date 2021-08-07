import { useCallback } from "react";
import { useRef } from "react";
import { increasePostsPageNumber } from "../../features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Spinner from "../../utils/Spinner/Spinner";
import Post from "../Post/PostCard";
import ProfileBox from "./components/ProfileBox";
import "./HomeContent.css";

const HomeContent = () => {
    const {hasMore,loading,posts} = useAppSelector(state => state.posts);
    const dispatch = useAppDispatch();
    const observer = useRef<IntersectionObserver>();

    const lastElementRef = useCallback((node) => {
        if(loading) return;
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                dispatch(increasePostsPageNumber())
            }
        })
        if(node) observer.current.observe(node)
    },[loading,dispatch,hasMore])

    return (
        <div className="home__content">
            <div className="left__section">
                {
                    posts.map( (post,i) => {
                       if(i+1 === posts.length){
                         return <Post lastElementRef={lastElementRef} key={post._id} {...post} />
                       }
                       return <Post key={post._id} {...post} />
                    })
                }
               <div>{loading && <Spinner/>}</div>
                {!loading && posts.length === 0 && <div className="no__posts__found">Follow your friends to see posts</div> }
            </div>
            <div className="right__section">
                <ProfileBox/>
            </div>
        </div>
    );
};

export default HomeContent;