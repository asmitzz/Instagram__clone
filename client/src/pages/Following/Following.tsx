// import { Link } from "react-router-dom";
// import { useAppSelector } from "../../store/hooks";

const Following = () => {
    // const following = useAppSelector(state => state.profile.connections.following);

    return (
        <div className="follow__container">
            {/* <h4 className="follow__heading">Following</h4>
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
            } */}
        </div>
    );
};

export default Following;
