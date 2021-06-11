import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { formValidate } from "./EditProfile.formValidate";
import { unwrapResult } from "@reduxjs/toolkit";
import { Profile } from "../../features/profile/profileSlice.types";
import { updateProfile } from "../../features/profile/profileSlice";

import Input from "../../utils/form/Input/Input";

import "./EditProfile.css";
import { Status } from "../../generic.types";
import Backdrop from "../../utils/Backdrop/Backdrop";

export type EditProfileErrors = {
    username:boolean;
    fullname:boolean;
    email:boolean;
    disabled:boolean;
}

const EditProfile = () => {
    const profile = useAppSelector(state => state.profile.profile);
    const dispatch = useAppDispatch();

    const token = useAppSelector(state => state.auth.token);

    useEffect(() => {
       if(profile){
         setData(profile)
       }
    },[profile])
    
    const [data,setData] = useState<Profile>({
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

    const [status,setStatus] = useState<Status>("idle");
    const [errorMsg,setErrorMsg] = useState<string>("");
    const [popup,setPopup] = useState<boolean>(false);
    const [file,setFile] = useState<File|null>(null);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name,value,type,files } = e.target;
        if(name === "private"){
            setData( state => ({...state,[name]:value === "yes" ? true : false}) )
            formValidate({...data,[name]:value === "yes" ? true : false},setError)
            return
        }
        if(type === "file" && files){
            let extension =  files[0].name;
            let isValidExtension = extension.split('.').pop() === "png" || extension.split('.').pop() === "jpeg" || extension.split('.').pop() === "jpg";
 
            if(isValidExtension){
                const file = new FileReader();
                file.readAsDataURL(files[0]);
                file.onloadend = () => {
                    setFile(files[0]);
                    setData(state => ({ ...state,[name]:file.result }));
                }
                setPopup(false)
                setError(state => ({ ...state,disabled:false}))
            }
            else{
                setStatus("failed");
                setErrorMsg("Invalid image");
                setTimeout(() => {
                    setStatus("idle");
                },2000)
                setPopup(false)
            }
            return;
         }

        setData( state => ({...state,[name]:value}) )
        formValidate({...data,[name]:value},setError)
    }

    const handleSubmit = async() => {
        try {
        setStatus("pending");
        const resultAction = await dispatch(updateProfile({token,data,file}));
        unwrapResult(resultAction);
        setStatus("succeeded");
        } catch (error) {
            setStatus("failed");
            setErrorMsg(error.message);
        }
        finally{
            setError({ username:false,fullname:false,email:false,disabled:true })
            setTimeout(() => {
               setStatus("idle")
            },2000)
        }
    }
    
    return (
        <div className="edit__profile">
           { popup && 
              <Backdrop toggle={setPopup} className="editprofile__backdrop"/>
           }

           {  popup && 
                 <div className="popup__container">
                      <h4 className="popup__heading">Change Profile Photo</h4>
                      <div className="upload__btn__container">
                         <input type="file" name="pic" accept=".png,.jpg,.jpeg" className="uploadfile" onChange={handleChange}/>
                         <div className="popup__options upload__btn">Upload Photo</div>
                      </div>
                      <button className="popup__options cancel__btn" onClick={() => setPopup(false)}>Cancel</button>
                  </div>
            }


           <section className="section__1">
               <img src={data?.pic} alt="pic" className="userPic"/>
               <div className="username__container">
                   <div className="username">{data.username}</div>
                   <button className="change__pic__btn" onClick={() => setPopup(true)}>Change Profile Photo</button>
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

               <button className="submit__btn" onClick={handleSubmit} disabled={error.disabled || status === "pending"}>{ status === "pending" ? "Saving..." : "Submit"}</button>
               
           </section>

           { status === "succeeded" && <div className="valid__feedback">Profile saved.</div>}
           { status === "failed" && <div className="invalid__feedback">{errorMsg}</div>}
        </div>
    );
};

export default EditProfile;
