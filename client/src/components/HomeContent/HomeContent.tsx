import { useAppSelector } from "../../store/hooks";
import Post from "../Post/PostCard";
import ProfileBox from "./components/ProfileBox";
import "./HomeContent.css";

const HomeContent = () => {
    const posts = useAppSelector(state => state.posts.posts);
    
    return (
        <div className="home__content">
            <div className="left__section">
                {
                  posts.length !== 0 ? posts.map( post => (
                       <Post key={post._id} {...post} />
                  ))
                  : <div className="no__posts__found">Follow your friends to see posts</div>
                }
            </div>
            <div className="right__section">
                <ProfileBox/>
            </div>
        </div>
    );
};

export default HomeContent;