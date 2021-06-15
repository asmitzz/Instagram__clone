import { BackdropProps } from "./Backdrop.types";
import "./Backdrop.css";

const Backdrop = ({children,toggle,className}:BackdropProps) => {
    return (
        <div className={`backdrop ${className}`} onClick={() => toggle(false)}>
            {children}
        </div>
    );
};

export default Backdrop;
