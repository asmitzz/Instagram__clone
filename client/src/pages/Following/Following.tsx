import { Link } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchFollowing } from "../../features/profile/profileSlice";
import { FollowersOrFollowing } from "../../features/profile/profileSlice.types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Following = () => {
    const [following,setFollowing] = useState<FollowersOrFollowing[]>([]);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    const userId = useParams().userId;

    useEffect(() => {
      dispatch(fetchFollowing({token,userId}))
     .then(unwrapResult)
     .then( originalPromiseResult => setFollowing(originalPromiseResult) )
    },[token,userId,dispatch]);

    return (
        <div className="follow__container">
            <h4 className="follow__heading">Following</h4>
            {
              following.map( user => (
                <div className="follower" key={user._id}>
                <Link to="/viewprofile" className="user">
                  <img className="user__pic" alt="users" src={user.pic}/>
                  <div className="user__details">
                    <span className="username">{user.username}</span>
                    <span className="fullname">{user.fullname}</span>
                  </div>
                </Link>
               <button className="removeBtn">Following</button>
            </div>
              ) )
            }

           { following.length === 0 && <p className="no__followers__found">No following found</p> }
        </div>
    );
};

export default Following;
