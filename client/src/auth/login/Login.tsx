import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginState,LoginError } from "./Login.types";
import { formValidate } from "./Login.formValidate";

import Input from "../../utils/form/Input/Input";
import "../auth.css";
import { signin } from "../../services/auth/auth.services";

const Login = () => {

    const [state,setState] = useState<LoginState>({
        emailOrUsername:"",
        password:""
    });

    const [error,setError] = useState<LoginError>({
        emailOrUsername:false,
        password:false,
        disabled:true
    });

    const [togglePassword,setTogglePassword] = useState<boolean>(false);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        const {value,name} = e.target;
        formValidate({...state,[name]:value},setError);
        setState( state => ({...state,[name]:value}) );
    }

    const handleSubmit = async(e:React.SyntheticEvent) => {
        e.preventDefault();
        const response = await signin(state);
        if("token" in response){
            console.log(response);
        }
    }

    return (
        <div className="auth__container">
            
            <form className="section1" onSubmit={handleSubmit}>
                <div className="section__heading"></div>
                <p className="signup__title">Sign up to see photos and videos from your friends.</p>
                <Input type="text" name="emailOrUsername" value={state.emailOrUsername} error={error.emailOrUsername} onChange={handleChange} placeholder="Email or username"/>
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