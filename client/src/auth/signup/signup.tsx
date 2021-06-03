import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupState,SignupError } from "./signup.types";
import { formValidate } from "./signup.formValidate";
import { useAppDispatch } from "../../store/hooks";
import { useIsMountedRef } from "../../utils/custom-hooks/useIsMountedRef";

import Input from "../../utils/form/Input/Input";

import "../auth.css";
import { signupUser } from "../../features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Status } from "../../generic.types";

const Signup = () => {

    const isMountedRef = useIsMountedRef();
    const dispatch = useAppDispatch();

    const [state,setState] = useState<SignupState>({
        email:"",
        fullname:"",
        username:"",
        password:""
    });

    const [error,setError] = useState<SignupError>({
        email:false,
        fullname:false,
        username:false,
        password:false,
        disabled:true,
    });
    
    const [togglePassword,setTogglePassword] = useState<boolean>(false);
    const [signupStatus,setSetSignupStatus] = useState<Status>("idle");

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
            setSetSignupStatus("pending");
            const resultAction = await dispatch(signupUser(state));
            unwrapResult(resultAction);
            setState({ email:"",fullname:"",username:"",password:"" });
            setError({ email:false,fullname:false,username:false,password:false,disabled:true });
        } catch (error) {
            console.log(error.response);
            setSetSignupStatus("failed");
        }
        finally{
            setSetSignupStatus("idle");
        }
    }

    return (
        <div className="auth__container">

            <form className="section1" onSubmit={handleSubmit}>
                <div className="insta__logo"></div>
                <p className="signup__title">Sign up to see photos and videos from your friends.</p>
                <Input type="email" name="email" value={state.email} error={error.email} onChange={handleChange} placeholder="Email"/>
                <Input type="text" name="fullname" value={state.fullname} error={error.fullname} onChange={handleChange} placeholder="Full Name"/>
                <Input type="text" name="username" value={state.username} error={error.username} onChange={handleChange} placeholder="Username"/>
                <Input type={togglePassword ? "text" :"password"} togglePassword={togglePassword} setTogglePassword={setTogglePassword} name="password" value={state.password} error={error.password} onChange={handleChange} placeholder="Password"/>
                <input type="submit" className="submit__btn" disabled={error.disabled} value="Sign up"/>
                <small className="form__feedback">{}</small>
            </form>

            <div className="section2">
                <p className="section2__title">Have an account? <Link to="/login" className="section2__title__Link">Log in</Link></p>
            </div>

        </div>
    );
};

export default Signup;