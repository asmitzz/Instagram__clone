import { Dispatch,SetStateAction } from "react";
import { LoginError, LoginState } from "./Login.types";

export const formValidate = (state:LoginState,setError:Dispatch<SetStateAction<LoginError>>):void => {
    let emailOrUsername = false,password = false;

    if(state.emailOrUsername.length < 5){
        emailOrUsername = true;
    }

    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(state.password)){
        password = true;
    }


    if(!emailOrUsername && !password){
       return setError( (state) => ({...state,emailOrUsername,password,disabled:false}) );
    };
    setError( (state) => ({...state,emailOrUsername,password,disabled:true}) );
}