import { useState } from "react";
import SearchBoxResult from "../../utils/searchBox/SearchBoxResult";
import "./Search.css";

const Search = () => {
    const [show,setShow] = useState<boolean>(false);

    return (
        <div className="search__container">
            <div className="search__header">
               { show && 
                  <button className="back__btn">
                      <i className="fa fa-arrow-left" aria-hidden="true"></i>
                  </button>
               }
               <input className="search__input" placeholder="Search" onBlur={() => setShow(false)} onFocus={() => setShow(true)}/>
            </div>

            <div className="searchBox__results">
                <SearchBoxResult/>
                <SearchBoxResult/>
                <SearchBoxResult/>
            </div>

        </div>
    );
};

export default Search;
