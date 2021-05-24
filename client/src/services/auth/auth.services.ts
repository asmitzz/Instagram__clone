import { SignupState } from "../../auth/signup/signup.types";
import axios, { AxiosError } from "axios";
import { serverError,AuthResponse } from "./auth.services.types";
import { LoginState } from "../../auth/login/Login.types";

export const signup = async(state:SignupState):Promise<AuthResponse|serverError> => {
    try {
        const res = await axios.post<AuthResponse>("http://localhost:5000/signup",state);
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

export const signin = async(state:LoginState):Promise<AuthResponse|serverError> => {
    try {
        const res = await axios.post<AuthResponse>("http://localhost:5000/signin",state);
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

export const checkAuth = async(token:string):Promise<AuthResponse|serverError> => {
    try {
        const res = await axios.get<AuthResponse>("http://localhost:5000/protected",{headers:{ authorization:`Bearer ${token}` }});
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