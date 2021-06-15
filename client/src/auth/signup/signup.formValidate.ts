import { Dispatch,SetStateAction } from "react";
import { SignupState,SignupError } from "./signup.types";

export const formValidate = (state:SignupState,setError:Dispatch<SetStateAction<SignupError>>):void => {
    let email = false,password = false,username = false,fullname = false;

    if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(state.email)){
        email = true;
    }

    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(state.password)){
        password = true;
    }

    if(state.username.length < 5){
        username = true
    }

    if(state.fullname.length < 3){
        fullname = true
    }

    if(!email && !password && !username && !fullname){
       return setError( (state:any) => ({...state,email,password,username,fullname,disabled:false}) );
    };
    
    setError( (state:any) => ({...state,email,password,username,fullname,disabled:true}) );
}