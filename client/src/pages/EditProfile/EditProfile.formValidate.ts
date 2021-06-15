import { Dispatch,SetStateAction } from "react";
import { Profile } from "../../features/profile/profileSlice.types";
import { EditProfileErrors } from "./EditProfile";

export const formValidate = (state:Profile,setError:Dispatch<SetStateAction<EditProfileErrors>>):void => {
    let username = false,fullname = false,email = false;

    if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(state.email)){
        email = true;
    }

    if(state.username.length < 5){
        username = true;
    }

    if(state.fullname.length < 3){
        fullname = true
    }

    if(!email && !username && !fullname){
       return setError( (state:any) => ({...state,email,username,fullname,disabled:false}) );
    };
    
    setError( (state:any) => ({...state,email,username,fullname,disabled:true}) );
}