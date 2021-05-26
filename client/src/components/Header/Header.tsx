import { useState } from "react";
import { NavLink } from "react-router-dom";
import Backdrop from "../../utils/Backdrop/Backdrop";
import DropBox from "../../utils/DropBox/DropBox";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

const Header = () => {
  const [toggleDropbox,setToggleDropbox] = useState(false);

  const handleProfile = () => {
     setToggleDropbox(state => !state)
  }

  return (
        <div className="header">
            { toggleDropbox && <Backdrop toggle={setToggleDropbox}/> }
            <button className="add__post__btn">
               <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </button>

            <NavLink to="/">
               <div className="insta__logo">
                 <img src="https://i.imgur.com/zqpwkLQ.png" alt="instagram" width="100%" height="100%"/>
               </div>
            </NavLink>

            <SearchBar/>

            <div className="right__section">
              <NavLink to="/" className="nav__link" activeClassName="active__link">
                 <i className="fa fa-home"></i>
              </NavLink>

              <NavLink to="/chats" className="nav__link chat__icon" activeClassName="active__link">
                 <i className="fas fa-comment-alt"></i>
              </NavLink>

              <button className="profile__btn" onClick={handleProfile}>
                  <img className="profile__icon" alt="profile" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
              </button>

              {toggleDropbox && <DropBox toggle={setToggleDropbox}/>}
            </div>
        </div>
    );
};

export default Header;
