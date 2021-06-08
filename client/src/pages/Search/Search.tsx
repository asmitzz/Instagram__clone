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
    }

    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault()
        if(status === "idle" && input !== ""){
            dispatch(fetchUsers({ token,searchTerm:input }))
        }
    }

    return (
        <div className="search__container">
            <form onSubmit={handleSubmit} className="search__header">
               { show && 
                  <button className="back__btn">
                      <i className="fa fa-arrow-left" aria-hidden="true"></i>
                  </button>
               }
                <input className="search__input" value={input} placeholder="Search" onChange={handleChange} onBlur={() => setShow(false)} onFocus={() => setShow(true)}/>
            </form>

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
