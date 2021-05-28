import { useEffect,Dispatch } from "react";

import { shallowEqual,useSelector,useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { RootState } from "./store/reducers/rootReducer";
import { checkAuth } from "./services/auth/auth.services";
import { AuthAction } from "./store/types/authReducer.types";

import Signup from "./auth/signup/signup";
import Login from "./auth/login/Login";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Comments from "./pages/Comments/Comments";
import Search from "./pages/Search/Search";
import Chats from "./pages/Chats/Chats";

import "./App.css";
import { useWindowSize } from "./utils/custom-hooks/useWindowSize";
import UserChatsMobile from "./pages/Chats/components/UserChatMobile";

const App = () => {
  const {auth} = useSelector( (state:RootState) => state,shallowEqual );
  const {token,login} = auth;
  const { width } = useWindowSize();
  const dispatch = useDispatch<Dispatch<AuthAction>>();

  useEffect(() => {
       (async function(){
         if(token){
           const res = await checkAuth(token);
           if("token" in res){
             const {login,token,user} = res;
             return dispatch({type:"LOGIN",payload:{login,token,user}})
           }
            localStorage.removeItem("token");
            return dispatch({type:"LOGOUT"})
         }
       })()
  },[token,dispatch])
  
  return (
    <div>
        { login && <Header/>}
       <ScrollToTop/>
       { !login ? 
       <Routes>
           <Route path="/" element={<Login/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/signup" element={<Signup/>}/>
       </Routes>
        :
        <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path="/profile" element={<Profile/>}/>
           <Route path="/profile/save" element={<Profile/>}/>
           <Route path="/comments" element={<Comments/>}/>
           <Route path="/search" element={<Search/>}/>
           <Route path="/chats" element={<Chats/>}/>
           <Route path="/chats/:chatID" element={width >= 700 ? <Chats/>: <UserChatsMobile/>}/>
        </Routes>
       }

      { login && <Footer/>}
    </div>
  );
};

export default App;