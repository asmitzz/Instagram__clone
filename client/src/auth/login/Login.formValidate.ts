import { Dispatch,SetStateAction } from "react";
import { LoginError, LoginState } from "./Login.types";

export const formValidate = (state:LoginState,setError:Dispatch<SetStateAction<LoginError>>):void => {
    let email = false,password = false;

    if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(state.email)){
        email = true;
    }

    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(state.password)){
        password = true;
    }


    if(!email && !password){
       return setError( (state) => ({...state,email,password,disabled:false}) );
    };
    setError( (state) => ({...state,email,password,disabled:true}) );
}