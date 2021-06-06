import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { fetchFollowers } from "../../features/profile/profileSlice";
import { FollowersOrFollowing } from "../../features/profile/profileSlice.types";
import { useAppDispatch } from "../../store/hooks";
import { useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import "./Followers.css";

const Followers = () => {
    const [followers,setFollowers] = useState<FollowersOrFollowing[]>([]);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    const userId = useParams().userId;

    useEffect(() => {
           dispatch(fetchFollowers({token,userId}))
          .then(unwrapResult)
          .then( originalPromiseResult => setFollowers(originalPromiseResult.followers) )
    },[token,userId,dispatch]);
    
    return (
        <div className="follow__container">
            <h4 className="follow__heading">Followers</h4>
            {
              followers.map( user => (
                <div className="follower" key={user._id}>
                <div className="user">
                  <img className="user__pic" alt="users" src={user.pic}/>
                  <div className="user__details">
                    <span className="username">{user.username}</span>
                    <span className="fullname">{user.fullname}</span>
                  </div>
                </div>
               <button className="removeBtn">Remove</button>
               </div>
              ) )
            }

            { followers.length === 0 && <p className="no__followers__found">No followers found</p> }
        </div>
    );
};

export default Followers;