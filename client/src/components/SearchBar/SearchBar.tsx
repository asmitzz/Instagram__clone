import { FormEvent, useState } from "react";
import Backdrop from "../../utils/Backdrop/Backdrop";
import SearchBox from "../../utils/searchBox/SearchBox";
import "./SearchBar.css";

const SearchBar = () => {
    const [toggleDropbox,setToggleDropbox] = useState(false);
    const [input,setInput] = useState<string>("");
    
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form className="search__bar" onSubmit={handleSubmit}>
            { toggleDropbox && <Backdrop toggle={setToggleDropbox} className="search__bar__backdrop"/>}
            <i className="fa fa-search"></i>
            <input type="search" value={input} onFocus={() => setToggleDropbox(true)} onChange={(e) => setInput(e.target.value)} className="search__input" placeholder="Search"/>
            { toggleDropbox && <SearchBox searchTerm={input}/> }
        </form>
    );
};

export default SearchBar;
