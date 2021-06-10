import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { User } from "../../features/auth/authSlice.types";

import Input from "../../utils/form/Input/Input";
import "./EditProfile.css";
import { formValidate } from "./EditProfile.formValidate";
import { updateUser } from "../../features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export type EditProfileErrors = {
    username:boolean;
    fullname:boolean;
    email:boolean;
    disabled:boolean;
}

const EditProfile = () => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    const token = useAppSelector(state => state.auth.token);

    useEffect(() => {
       if(user){
         setData(user)
       }
    },[user])
    
    const [data,setData] = useState<User>({
        _id:"",
        username:"",
        fullname:"",
        email:"",
        bio:"",
        pic:"",
        private:false,
        website:"",
        gender:""
    }); 
    
    const [error,setError] = useState<EditProfileErrors>({
        username:false,
        fullname:false,
        email:false,
        disabled:true
    }); 

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name,value } = e.target;
        if(name === "private"){
            setData( state => ({...state,[name]:value === "yes" ? true : false}) )
            formValidate({...data,[name]:value === "yes" ? true : false},setError)
            return
        }
        setData( state => ({...state,[name]:value}) )
        formValidate({...data,[name]:value},setError)
    }

    const handleSubmit = () => {
        dispatch(updateUser({token,data}))
        .then(unwrapResult)
        .then((originalPromiseResult) => {
            console.log(originalPromiseResult.user);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    return (
        <div className="edit__profile">
           <section className="section__1">
               <img src={data?.pic} alt="pic" className="userPic"/>
               <div className="username__container">
                   <div className="username">{data.username}</div>
                   <button className="change__pic__btn">Change Profile Photo</button>
               </div>
           </section>

           <section className="section__2">
               <Input type="text" error={error.fullname} name="fullname" value={data.fullname} onChange={handleChange} placeholder="fullname"/>
               <Input type="text" error={error.username} name="username"  value={data.username} onChange={handleChange} placeholder="username"/>
               <Input type="text" error={false} name="website"  value={data.website} onChange={handleChange} placeholder="website"/>
               <Input type="text" error={false} name="bio"  value={data.bio} onChange={handleChange} placeholder="bio"/>
               <Input type="email" error={error.email} name="email"  value={data.email} onChange={handleChange} placeholder="email"/>
               
               <label htmlFor="gender" className="gender__label">
                 Gender:
                 <input type="radio" className="radio__input" name="gender" onChange={handleChange} checked={data.gender === "male"} value="male"/>male
                 <input type="radio" className="radio__input" name="gender" onChange={handleChange} checked={data.gender === "female"} value="female"/>female
               </label>

               <label htmlFor="private" className="private__label">
                 Private:
                 <input type="radio" className="radio__input" onChange={handleChange} checked={data.private} name="private" value="yes"/>yes
                 <input type="radio" className="radio__input" onChange={handleChange} checked={!data.private} name="private" value="no"/>no
               </label>

               <button className="submit__btn" onClick={handleSubmit} disabled={error.disabled}>Submit</button>
               
           </section>
        </div>
    );
};

export default EditProfile;
