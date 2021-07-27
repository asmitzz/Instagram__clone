import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginState,LoginError } from "./Login.types";
import { formValidate } from "./Login.formValidate";
import { useIsMountedRef } from "../../utils/custom-hooks/useIsMountedRef";
import { useAppDispatch } from "../../store/hooks";
import { loginUser } from "../../features/auth/authSlice";
import { Status } from "../../generic.types";
import { unwrapResult } from "@reduxjs/toolkit";

import Input from "../../utils/form/Input/Input";

import "../auth.css";


const Login = () => {

    const isMountedRef = useIsMountedRef();
    
    const [state,setState] = useState<LoginState>({
        emailOrUsername:"",
        password:""
    });

    const [error,setError] = useState<LoginError>({
        emailOrUsername:false,
        password:false,
        disabled:true,
    });

    const [togglePassword,setTogglePassword] = useState<boolean>(false);
    const [feedback,setFeedback] = useState<string>("");
    const [loginStatus,setLoginStatus] = useState<Status>("idle");
    const [loginAsGuestStatus,setLoginAsGuestStatus] = useState<Status>("idle");

    const dispatch = useAppDispatch();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        if(!isMountedRef.current) return; 
        const {value,name} = e.target;
        formValidate({...state,[name]:value},setError);
        setState( state => ({...state,[name]:value}) );
    }

    const handleSubmit = async(e:React.SyntheticEvent) => {
        if(!isMountedRef.current) return; 
        e.preventDefault();
        try {
            setLoginStatus("pending")
            const resultAction = await dispatch(loginUser(state));
            unwrapResult(resultAction);
            setState({ emailOrUsername:"", password:"" });
            setError({ emailOrUsername:false,password:false,disabled:true });
            setLoginStatus("succeeded");
            setFeedback("");
        } catch (error) {
            setFeedback(error.message);
        }
        finally {
            setLoginStatus("idle");
        }
    }

    const loginAsGuest = async(e:React.SyntheticEvent) => {
        e.preventDefault();
        setLoginAsGuestStatus("pending")
        try {
            const resultAction = await dispatch(loginUser({emailOrUsername:"avengers",password:"demo1234"}));
            unwrapResult(resultAction);
            setLoginAsGuestStatus("idle")
        } catch (error) {
            setFeedback("Something went wrong with guest login. Please signup and then try again");
            setLoginAsGuestStatus("idle")
        }
    }

    return (
        <div className="auth__container">
            
            <form className="section1">
                <div className="insta__logo"></div>
                <p className="signup__title">Sign up to see photos and videos from your friends.</p>
                <Input type="text" name="emailOrUsername" value={state.emailOrUsername} error={error.emailOrUsername} onChange={handleChange} placeholder="Email or username"/>
                <Input type={togglePassword ? "text" : "password"} togglePassword={togglePassword} setTogglePassword={setTogglePassword} name="password" value={state.password} error={error.password} onChange={handleChange} placeholder="Password"/>
                <input type="submit" className="submit__btn"  onClick={handleSubmit} disabled={error.disabled || loginStatus !== "idle"} value={ loginStatus === "idle" ? "Log In" : "Logging..."}/>
                <div className="separator">
                    <div className="separator__line"></div>
                    <div className="separator__text">OR</div>
                    <div className="separator__line"></div>
                </div>
                <button className="submit__btn" onClick={loginAsGuest}>{ loginAsGuestStatus === "idle" ? "Login as guest" : "Logging..."}</button>
                <small className="auth__invalid__feedback">{feedback}</small>
            </form>

            <div className="section2">
                <p className="section2__title">Don't have an account? <Link to="/signup" className="section2__title__Link">Sign up</Link></p>
            </div>

        </div>
    );
};

export default Login;