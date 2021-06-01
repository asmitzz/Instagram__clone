import { Dispatch,SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../features/auth/authSlice";

import "./DropBox.css";

type DropBoxProps = {
    toggle:Dispatch<SetStateAction<boolean>>
}

const DropBox = ({toggle}:DropBoxProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleBtn = (path:string) => {
        if(path === "/"){
            localStorage.removeItem("token");
            dispatch(logout());
        }
        navigate(path);
        toggle(false)
    }

    return (
            <div className="dropbox">
              <button className="dropbox__btn" onClick={() => handleBtn("/profile")}>
                 <i className="fas fa-user"></i><span>Profile</span>
             </button>

             <button className="dropbox__btn" onClick={() => handleBtn("/profile/save")}>
                 <i className="fas fa-save"></i><span>Saved</span>
             </button>

             <button className="dropbox__btn logout" onClick={() => handleBtn("/")}>
                 Log Out
             </button>
          </div>
    )
};

export default DropBox;