import { useAppSelector } from "../../store/hooks";
import Post from "../Post/Post";
import ProfileBox from "./components/ProfileBox";
import "./HomeContent.css";

const HomeContent = () => {
    const posts = useAppSelector(state => state.posts.posts);
    
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