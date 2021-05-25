import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthAction } from "../../store/types/authReducer.types";

import "./DropBox.css";

const DropBox = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<Dispatch<AuthAction>>();

    const handleBtn = (path:string) => {
        if(path === "/"){
            localStorage.removeItem("token");
            dispatch({type:"LOGOUT"});
        }
        navigate(path);
    }

    return (
            <div className="dropbox">
              <button className="dropbox__btn" onClick={() => handleBtn("/profile")}>
                 <i className="fas fa-user"></i><span>Profile</span>
             </button>

             <button className="dropbox__btn" onClick={() => handleBtn("/save")}>
                 <i className="fas fa-save"></i><span>Saved</span>
             </button>

             <button className="dropbox__btn logout" onClick={() => handleBtn("/")}>
                 Log Out
             </button>
          </div>
    )
};

export default DropBox;