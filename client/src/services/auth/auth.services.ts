import { SignupState } from "../../auth/signup/signup.types";
import axios, { AxiosError } from "axios";
import { serverError,SignupResponse } from "./auth.services.types";
import { LoginState } from "../../auth/login/Login.types";
import { AuthState } from "../../store/types/auth.types";

export const signup = async(state:SignupState):Promise<SignupResponse|serverError> => {
    try {
        const res = await axios.post<SignupResponse>("http://localhost:5000/signup",state);
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            const serverError = (error as AxiosError<serverError>);
            if(serverError && serverError.response){
                return serverError.response.data
            }
        }
        return { message:"something went wrong" }
    }
}

export const signin = async(state:LoginState):Promise<AuthState|serverError> => {
    try {
        const res = await axios.post<AuthState>("http://localhost:5000/signin",state);
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            const serverError = (error as AxiosError<serverError>);
            if(serverError && serverError.response){
                return serverError.response.data
            }
        }
        return { message:"something went wrong" }
    }
}