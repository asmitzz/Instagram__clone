import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { fetchUsers } from "../../features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Backdrop from "../../utils/Backdrop/Backdrop";
import SearchBox from "../../utils/searchBox/SearchBox";
import "./SearchBar.css";

const SearchBar = () => {
    
    const [toggleDropbox,setToggleDropbox] = useState(false);
    const [searchTerm,setSearchTerm] = useState<string>("");
    const timeoutRef = useRef<any>(null);

    const token = useAppSelector(state => state.auth.token);
    const dispatch = useAppDispatch();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchTerm(value);
    }

    useEffect(() => {
        if(timeoutRef.current !== null){
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
           timeoutRef.current = null;
           if(searchTerm !== ""){
              dispatch(fetchUsers({ token,searchTerm }))
           }
        },1000)

    },[searchTerm,token,dispatch])

    return (
        <div className="search__bar">
            { toggleDropbox && <Backdrop toggle={setToggleDropbox} className="search__bar__backdrop"/>}
            <i className="fa fa-search"></i>
            <input type="search" value={searchTerm} onFocus={() => setToggleDropbox(true)} onChange={handleChange} className="search__input" placeholder="Search"/>
            { toggleDropbox && <SearchBox setToggleDropbox={setToggleDropbox}/> }
        </div>
    );
};

export default SearchBar;
