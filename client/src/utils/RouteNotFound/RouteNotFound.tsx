import { useNavigate } from "react-router-dom";
import "./RouteNotFound.css";

const RouteNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="route__not__found">
            <h1>404 Route Not Found!!</h1>
            <button className="go__to__home__btn" onClick={() => navigate("/")}>GO TO HOMEPAGE</button>
        </div>
    );
};

export default RouteNotFound;