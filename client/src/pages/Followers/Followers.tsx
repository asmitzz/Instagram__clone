import { useAppSelector } from "../../store/hooks";
import "./Followers.css";

const Followers = () => {
    const followers = useAppSelector(state => state.profile.connections.followers);
    
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
        </div>
    );
};

export default Followers;
