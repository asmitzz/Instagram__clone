import { SearchBoxProps } from "./SearchBox.types";

import "./SearchBox.css";
import { useState } from "react";
import SearchBoxResult from "./SearchBoxResult";

const SearchBox = ({searchTerm}:SearchBoxProps) => {
    const [data] = useState<string[]>([]) // change type
    console.log(searchTerm);
    
    return (
        <div className="searchBox">
            {
                data.length === 0 ? (
                    <div className="searchBox__results">
                        <SearchBoxResult/>
                    </div>
                ):
                (   
                  <>
                    <h4 className="searchBox__heading">Search</h4>
                    <div className="searchBox__empty">
                        No results found
                    </div>
                  </>
                )
            }
        </div>
    );
};

export default SearchBox;
