import { useEffect } from "react";

import { useAppSelector,useAppDispatch } from "./store/hooks";
import { Route, Routes } from "react-router-dom";
import { checkAuth } from "./services/auth/auth.services";
import { useWindowSize } from "./utils/custom-hooks/useWindowSize";

import Signup from "./auth/signup/signup";
import Login from "./auth/login/Login";

import ScrollToTop from "./utils/custom-hooks/ScrollToTop";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Comments from "./pages/Comments/Comments";
import Search from "./pages/Search/Search";
import Chats from "./pages/Chats/Chats";
import UserChatsMobile from "./pages/Chats/components/UserChatMobile";
import Followers from "./pages/Followers/Followers";
import Following from "./pages/Following/Following";
import PostsSection from "./pages/Profile/components/PostsSection";

import { login as loginuser, logout } from "./auth/authSlice";
import AddPost from "./pages/Addpost/AddPost";

import "./App.css";

const App = () => {
  const auth = useAppSelector((state) => state.auth);
  const { token,login } = auth;
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();

  useEffect(() => {
       (async function(){
         if(token){
           const res = await checkAuth(token);
           if("token" in res){
             const {login,token,user} = res;
             return dispatch(loginuser({login,token,user}))
           }
            localStorage.removeItem("token");
            return dispatch(logout())
         }
       })()
  },[token,dispatch]);
  
  return (
    <div>
       { login && <Header/>}
       <ScrollToTop/>
       { !login ? 
       <Routes>
           <Route path="/" element={<Login/>}>
               <Route path="/login" element={<Login/>}/>
           </Route>
           <Route path="/signup" element={<Signup/>}/>
       </Routes>
        :
        <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path="/profile" element={<Profile/>}>
              <Route path="/" element={<PostsSection/>}/>
              <Route path="/save" element={<PostsSection/>}/>
           </Route>
           <Route path="/profile/followers" element={<Followers/>}/>
           <Route path="/profile/following" element={<Following/>}/>
           <Route path="/comments" element={<Comments/>}/>
           <Route path="/search" element={<Search/>}/>
           <Route path="/chats" element={<Chats/>}/>
           <Route path="/chats/:chatID" element={width >= 700 ? <Chats/>: <UserChatsMobile/>}/>
           <Route path="/post/add" element={<AddPost/>}/>
        </Routes>
       }

      { login && <Footer/>}
    </div>
  );
};

export default App;