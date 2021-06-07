import { useAppSelector } from "../../store/hooks";

import SearchBoxResult from "./SearchBoxResult";

import "./SearchBox.css";

const SearchBox = () => {
    const { users,status } = useAppSelector(state => state.users)
    
    return (
        <div className="searchBox">
            {
                users.length !== 0 && status === "idle" && 
                 <div className="searchBox__results">
                      {
                          users.map(user => (
                            <SearchBoxResult key={user._id} user={user}/>
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
              <div className="spinner__container">
                  <div className="spinner"></div>
              </div>
            } 
        </div>
    );
};

export default SearchBox;
