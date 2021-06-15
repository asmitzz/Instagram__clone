import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { User } from "../../features/users/usersSlice.types";
import { useAppSelector } from "../../store/hooks";

type SearchBoxResultProps = {
  user:User,
  setToggleDropbox?:Dispatch<SetStateAction<boolean>>
}

const SearchBoxResult = ({user,setToggleDropbox}:SearchBoxResultProps) => {

  const userId = useAppSelector(state => state.auth.user?._id);
 
  return (
    <Link to={user._id === userId ? "/profile" : `/viewprofile/${user._id}`} onClick={setToggleDropbox ? () => setToggleDropbox(false) : () => {}} className="searchBox__result">
      <div className="avatar">
        <img className="avatar__img" src={user.pic} alt="avatar"/>
      </div>
      <div className="result__content">
        <h5 className="username">{user.username}</h5>
        <div className="fullname">{user.fullname}</div>
      </div>
    </Link>
  );
};

export default SearchBoxResult;
