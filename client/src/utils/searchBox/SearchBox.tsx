import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../store/hooks";
import Spinner from "../Spinner/Spinner";

import SearchBoxResult from "./SearchBoxResult";

import "./SearchBox.css";

type SearchBoxProps = {
  setToggleDropbox:Dispatch<SetStateAction<boolean>>
}

const SearchBox = ({setToggleDropbox}:SearchBoxProps) => {
    const { users,status } = useAppSelector(state => state.users)
    
    return (
        <div className="searchBox">
            {
                users.length !== 0 && status === "idle" && 
                 <div className="searchBox__results">
                      {
                          users.map(user => (
                            <SearchBoxResult key={user._id} user={user} setToggleDropbox={setToggleDropbox}/>
                          ))
                      }
                 </div>
            }
              
            {
                users.length === 0 && status === "idle" && 
                  <>
                    <h4 className="searchBox__heading">Search</h4>
                    <div className="searchBox__empty">
                        No results found
                    </div>
                  </>
            }   

            { status === "pending" && 
              <Spinner/>
            } 
        </div>
    );
};

export default SearchBox;
