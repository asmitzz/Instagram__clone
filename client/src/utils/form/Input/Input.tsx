import Feedback from "../Feedback/Feedback";
import { InputProps } from "./Input.types";

import "./Input.css";

const Input = ({type,value,error,onChange,name,placeholder,togglePassword,setTogglePassword}:InputProps) => {
    return (
        <div className="form__group">
           { value !== "" && <label className="form__label">{placeholder}</label>}
           <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className="form__control"/>
           { value !== "" && <Feedback valid={error} togglePassword={togglePassword} setTogglePassword={setTogglePassword}/>}
       </div>
    );
};

export default Input;
