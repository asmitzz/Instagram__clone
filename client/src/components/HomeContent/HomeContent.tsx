import Post from "../Post/Post";
import ProfileBox from "./components/ProfileBox";
import SuggestionBox from "./components/SuggestionBox";
import "./HomeContent.css";

const HomeContent = () => {
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