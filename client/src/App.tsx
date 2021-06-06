import { useEffect } from "react";

import { useAppSelector,useAppDispatch } from "./store/hooks";
import { Route, Routes, useLocation } from "react-router-dom";
import { useWindowSize } from "./utils/custom-hooks/useWindowSize";
import { checkAuth } from "./features/auth/authSlice";

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
import ViewProfile from "./pages/ViewProfile/ViewProfile";
import AddPost from "./pages/Addpost/AddPost";

import "./App.css";
import Activity from "./pages/Activity/Activity";

const App = () => {
  const auth = useAppSelector((state) => state.auth);
  const { token,login } = auth;
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const path = useLocation().pathname;

  useEffect(() => {
        if(token){
             dispatch(checkAuth(token));
        }
  },[token,dispatch]);
  
  return (
    <div>
       { login && <Header/>}
       { path !== "/" && <ScrollToTop/>}
       { !login ? 
       <Routes>
           <Route path="/" element={<Login/>}/>
           <Route path="/signup" element={<Signup/>}/>
       </Routes>
        :
        <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path="/profile" element={<Profile/>}>
              <Route path="/" element={<PostsSection/>}/>
              <Route path="/save" element={<PostsSection/>}/>
           </Route>
           <Route path="/followers/:userId" element={<Followers/>}/>
           <Route path="/following/:userId" element={<Following/>}/>
           <Route path="/viewprofile/:userId" element={<ViewProfile/>}/>
           <Route path="/comments/:postId" element={<Comments/>}/>
           <Route path="/search" element={<Search/>}/>
           <Route path="/activity" element={<Activity/>}/>
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