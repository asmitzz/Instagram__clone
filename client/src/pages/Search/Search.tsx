import { useState } from "react";
import { fetchUsers } from "../../features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import SearchBoxResult from "../../utils/searchBox/SearchBoxResult";
import "./Search.css";

const Search = () => {
    const [show,setShow] = useState<boolean>(false);
    const [input,setInput] = useState<string>("");
    const token = useAppSelector(state => state.auth.token);
    const { users,status } = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setInput(value);
        setTimeout(() => {
            if(status === "idle" && value !== ""){
              dispatch(fetchUsers({ token,searchTerm:value }))
            }
         },300)
    }

    return (
        <div className="search__container">
            <div className="search__header">
               { show && 
                  <button className="back__btn">
                      <i className="fa fa-arrow-left" aria-hidden="true"></i>
                  </button>
               }
               <input className="search__input" value={input} placeholder="Search" onChange={handleChange} onBlur={() => setShow(false)} onFocus={() => setShow(true)}/>
            </div>

            <div className="searchBox__results">
               { 
                 users.map(user => (
                     <SearchBoxResult key={user._id} user={user}/>
                 ))
               }
            </div>

        </div>
    );
};

export default Search;
