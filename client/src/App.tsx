import { useEffect } from "react";

import { useAppSelector,useAppDispatch } from "./store/hooks";
import { Route, Routes, useLocation } from "react-router-dom";

import { useWindowSize } from "./utils/custom-hooks/useWindowSize";
import ScrollToTop from "./utils/custom-hooks/ScrollToTop";

import { checkAuth } from "./features/auth/authSlice";
import { fetchPosts } from "./features/posts/postsSlice";
import { fetchProfile } from "./features/profile/profileSlice";
import { fetchSavedPosts } from "./features/savedposts/savedpostsSlice";

import Signup from "./auth/signup/signup";
import Login from "./auth/login/Login";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Comments from "./pages/Comments/Comments";
import Search from "./pages/Search/Search";
import Chats from "./pages/Chats/Chats";
import UserChatsMobile from "./pages/Chats/components/UserChatsMobile";
import UserChatsDesktop from "./pages/Chats/components/UserChatsDesktop";
import Followers from "./pages/Followers/Followers";
import Following from "./pages/Following/Following";
import PostsSection from "./pages/Profile/components/PostsSection";
import ViewProfile from "./pages/ViewProfile/ViewProfile";
import AddPost from "./pages/Addpost/AddPost";
import Activity from "./pages/Activity/Activity";
import EditProfile from "./pages/EditProfile/EditProfile";

import "./App.css";
import IndividualPostPage from "./pages/IndividualPostPage/IndividualPostPage";

const App = () => {
  const auth = useAppSelector((state) => state.auth);
  const postsRequestStatus = useAppSelector(state => state.posts.status);
  const savedpostsRequestStatus = useAppSelector(state => state.savedposts.status);
  const profileRequestStatus = useAppSelector(state => state.profile.status);
  
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const path = useLocation().pathname;

  const { token,login } = auth;

  useEffect(() => {
        if(token){
             dispatch(checkAuth(token));
        }
  },[token,dispatch]);

  useEffect(() => {
    if(postsRequestStatus === "idle" && token){
        dispatch(fetchPosts({token}));
    }
    
 },[postsRequestStatus,token,dispatch])

 useEffect(() => {
     if(savedpostsRequestStatus === "idle" && token){
         dispatch(fetchSavedPosts({token}));
      }
 },[savedpostsRequestStatus,token,dispatch])

 useEffect(() => {
     if(profileRequestStatus === "idle" && token){
         dispatch(fetchProfile({token}))
     }
 },[dispatch,profileRequestStatus,token])
  
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
           <Route path="/profile/edit" element={<EditProfile/>}/>
           <Route path="/followers/:userId" element={<Followers/>}/>
           <Route path="/following/:userId" element={<Following/>}/>
           <Route path="/viewprofile/:userId" element={<ViewProfile/>}/>
           <Route path="/comments/:postId" element={<Comments/>}/>
           <Route path="/search" element={<Search/>}/>
           <Route path="/activity" element={<Activity/>}/>
           { 
             width >= 700 &&
             <Route path="/chats" element={<Chats/>}>
               <Route path="/:chatId" element={<UserChatsDesktop/>}/>
             </Route> 
           } 
           { width < 700 && <Route path="/chats" element={<Chats/>}/>}
           { width < 700 && <Route path="/chats/:chatId" element={<UserChatsMobile/>}/>}
           <Route path="/post/add" element={<AddPost/>}/>
           <Route path="/posts/:postId" element={<IndividualPostPage/>}/>
        </Routes>
       }

      { login && <Footer/>}
    </div>
  );
};

export default App;