import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginState,LoginError } from "./Login.types";
import { formValidate } from "./Login.formValidate";

import Input from "../../utils/form/Input/Input";
import "../auth.css";

const Login = () => {

    const [state,setState] = useState<LoginState>({
        email:"",
        password:""
    });

    const [error,setError] = useState<LoginError>({
        email:false,
        password:false,
        disabled:true
    });

    const [togglePassword,setTogglePassword] = useState<boolean>(false);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        const {value,name} = e.target;
        formValidate({...state,[name]:value},setError);
        setState( state => ({...state,[name]:value}) );
    }

    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault();
    }

    return (
        <div className="auth__container">
            
            <form className="section1" onSubmit={handleSubmit}>
                <div className="section__heading"></div>
                <p className="signup__title">Sign up to see photos and videos from your friends.</p>
                <Input type="email" name="email" value={state.email} error={error.email} onChange={handleChange} placeholder="Email"/>
                <Input type={togglePassword ? "text" : "password"} togglePassword={togglePassword} setTogglePassword={setTogglePassword} name="password" value={state.password} error={error.password} onChange={handleChange} placeholder="Password"/>
                <input type="submit" className="submit__btn" disabled={error.disabled} value="Log In"/>
            </form>

            <div className="section2">
                <p className="section2__title">Don't have an account? <Link to="/signup" className="section2__title__Link">Sign up</Link></p>
            </div>

        </div>
    );
};

export default Login;