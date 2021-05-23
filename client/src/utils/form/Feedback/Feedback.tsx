import { Dispatch,SetStateAction } from "react";
import "./Feedback.css";

type FeedbackProps = {
    valid:boolean;
    togglePassword?:boolean;
    setTogglePassword?:Dispatch<SetStateAction<boolean>>;
}

const Feedback = ({valid,togglePassword,setTogglePassword}:FeedbackProps) => {
    return valid ? (
        <div className="feedback">
            <i className="fa fa-times-circle" aria-hidden="true"></i>
            { setTogglePassword && <i onClick={setTogglePassword ? () => setTogglePassword(state => !state) : () => {}} className={togglePassword ? "fa fa-eye-slash" :"fa fa-eye"}></i>}
        </div>
    ) : (
        <div className="feedback">
            <i className="fa fa-check" aria-hidden="true"></i>
            { setTogglePassword && <i onClick={setTogglePassword ? () => setTogglePassword(state => !state) : () => {}} className={togglePassword ? "fa fa-eye-slash" :"fa fa-eye"}></i>}
        </div>
    )
};

export default Feedback;
