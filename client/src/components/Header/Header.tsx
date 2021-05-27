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

            <NavLink end to="/">
               <div className="insta__logo">
                 <img src="https://i.imgur.com/zqpwkLQ.png" alt="instagram" width="100%" height="100%"/>
               </div>
            </NavLink>

            <SearchBar/>

            <div className="right__section">
              <NavLink end to="/" className="nav__link" activeClassName="active__link">
                 <svg aria-label="Home" className="svg" fill="#8E8E8E" height="22" viewBox="0 0 48 48" width="22"><path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path></svg>
              </NavLink>

              <NavLink end to="/chats" className="nav__link chat__icon" activeClassName="active__link">
                 <svg aria-label="Messenger" className="svg" fill="#8E8E8E" height="22" viewBox="0 0 48 48" width="22"><path clip-rule="evenodd" d="M10.2 29.8c-.7 1 .6 2.2 1.6 1.5l7.3-5.5c.5-.4 1.2-.4 1.7 0l5.4 4c1.6 1.2 3.9.8 5-.9L38 18.2c.7-1-.6-2.2-1.6-1.5L29 22.2c-.5.4-1.2.4-1.7 0l-5.4-4c-1.6-1.2-3.9-.8-5 .9l-6.7 10.7zM24 1c13 0 23 9.5 23 22.3S37 45.6 24 45.6c-2.3 0-4.6-.3-6.7-.9-.4-.1-.8-.1-1.2.1l-4.6 2c-1.1.6-2.5-.3-2.5-1.6l-.1-4.1c0-.5-.2-1-.6-1.3C3.7 35.8 1 30 1 23.3 1 10.5 11 1 24 1z" fill-rule="evenodd"></path></svg>
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
