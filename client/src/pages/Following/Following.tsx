import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import { fetchFollowing } from "../../features/profile/profileSlice";
import { FollowersOrFollowing } from "../../features/profile/profileSlice.types";
import { Status } from "../../generic.types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Spinner from "../../utils/Spinner/Spinner";

const Following = () => {
    const [following,setFollowing] = useState<FollowersOrFollowing[]>([]);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
   
    const userId = useParams().userId;
    const [status,setStatus] = useState<Status>("idle");

    useEffect(() => {
      dispatch(fetchFollowing({token,userId}))
     .then(unwrapResult)
     .then( originalPromiseResult => {
       setFollowing(originalPromiseResult.following)
       setStatus("succeeded")
      } )
    },[token,userId,dispatch]);

    return (
        <div className="follow__container">
            <h4 className="follow__heading">Following</h4>
            {
              following.map( user => (
                <div className="follower" key={user._id}>
                <Link to={`/viewprofile/${user._id}`} className="user">
                  <img className="user__pic" alt="users" src={user.pic}/>
                  <div className="user__details">
                    <span className="username">{user.username}</span>
                    <span className="fullname">{user.fullname}</span>
                  </div>
                </Link>
            </div>
              ) )
            }

           { following.length === 0 && status === "succeeded" && <p className="no__followers__found">No following found</p> }
           { status !== "succeeded" && <div className="spinner__container"> <Spinner/> </div>} 
        </div>
    );
};

export default Following;
