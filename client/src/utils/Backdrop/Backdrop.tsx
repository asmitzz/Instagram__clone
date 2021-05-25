import { BackdropProps } from "./Backdrop.types";
import "./Backdrop.css";

const Backdrop = ({toggle,className}:BackdropProps) => {
    return (
        <div className={`backdrop ${className}`} onClick={() => toggle(state => !state)}>
            
        </div>
    );
};

export default Backdrop;
