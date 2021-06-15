import { useEffect, useRef, useState } from "react";
import { fetchUsers } from "../../features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import SearchBoxResult from "../../utils/searchBox/SearchBoxResult";
import Spinner from "../../utils/Spinner/Spinner";
import "./Search.css";

const Search = () => {
    const [show,setShow] = useState<boolean>(false);
    const [input,setInput] = useState<string>("");
    const timeoutRef = useRef<any>(null);
    const token = useAppSelector(state => state.auth.token);
    const { users,status } = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setInput(value);
    }

    useEffect(() => {
        if(timeoutRef.current !== null){
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
           timeoutRef.current = null;
           if(input !== ""){
              dispatch(fetchUsers({ token,searchTerm:input }))
           }
        },1000)

    },[input,token,dispatch])

    return (
        <div className="search__container">
            
            { status === "pending" && 
              <div className="spinner__container">
                  <Spinner/>
              </div>
            } 
            
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
