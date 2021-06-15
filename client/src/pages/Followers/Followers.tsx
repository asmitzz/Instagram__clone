import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { fetchFollowers } from "../../features/profile/profileSlice";
import { FollowersOrFollowing } from "../../features/profile/profileSlice.types";
import { useAppDispatch } from "../../store/hooks";
import { useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import Spinner from "../../utils/Spinner/Spinner";
import { Link } from "react-router-dom";
import { Status } from "../../generic.types";

import "./Followers.css";

const Followers = () => {
    const [followers,setFollowers] = useState<FollowersOrFollowing[]>([]);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    const userId = useParams().userId;
    const [status,setStatus] = useState<Status>("idle");

    useEffect(() => {
           dispatch(fetchFollowers({token,userId}))
          .then(unwrapResult)
          .then( originalPromiseResult => {
            setFollowers(originalPromiseResult.followers)
            setStatus("succeeded")
          } )
    },[token,userId,dispatch]);
    
    return (
        <div className="follow__container">
            <h4 className="follow__heading">Followers</h4>
            {
              followers.map( user => (
                <div className="follower" key={user._id}>
                <Link to={`/viewprofile/${user._id}`} className="user">
                  <img className="user__pic" alt="users" src={user.pic}/>
                  <div className="user__details">
                    <span className="username">{user.username}</span>
                    <span className="fullname">{user.fullname}</span>
                  </div>
                </Link>
                <button className="removeBtn">Remove</button>
               </div>
              ) )
            }

            { followers.length === 0 && status === "succeeded" && <p className="no__followers__found">No followers found</p> }
            { status !== "succeeded" && <div className="spinner__container"> <Spinner/> </div>} 
        </div>
    );
};

export default Followers;