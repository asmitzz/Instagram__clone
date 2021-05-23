import { useState } from "react";
import { Link } from "react-router-dom";
import { SignupState,SignupError } from "./signup.types";
import { formValidate } from "./signup.formValidate";

import Input from "../../utils/form/Input/Input";
import "../auth.css";

const Signup = () => {

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
                <h1 className="section__heading">Instagram</h1>
                <p className="signup__title">Sign up to see photos and videos from your friends.</p>
                <Input type="email" name="email" value={state.email} error={error.email} onChange={handleChange} placeholder="Email"/>
                <Input type="text" name="fullname" value={state.fullname} error={error.fullname} onChange={handleChange} placeholder="Full Name"/>
                <Input type="text" name="username" value={state.username} error={error.username} onChange={handleChange} placeholder="Username"/>
                <Input type={togglePassword ? "text" :"password"} togglePassword={togglePassword} setTogglePassword={setTogglePassword} name="password" value={state.password} error={error.password} onChange={handleChange} placeholder="Password"/>
                <input type="submit" className="submit__btn" disabled={error.disabled} value="Sign up"/>
            </form>

            <div className="section2">
                <p className="section2__title">Have an account? <Link to="/login" className="section2__title__Link">Log in</Link></p>
            </div>

        </div>
    );
};

export default Signup;
