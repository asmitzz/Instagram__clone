import { useEffect, useState } from "react";

import { useAppSelector,useAppDispatch } from "./store/hooks";
import { Route, Routes, useLocation } from "react-router-dom";

import { useWindowSize } from "./utils/custom-hooks/useWindowSize";
import ScrollToTop from "./utils/custom-hooks/ScrollToTop";
import Spinner from "./utils/Spinner/Spinner";

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
import { Status } from "./generic.types";

const App = () => {
  const auth = useAppSelector((state) => state.auth);

  const [status,setStatus] = useState<Status>("idle");  
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const path = useLocation().pathname;

  const { token,login } = auth;

  useEffect(() => {
    (async function(){
       try {
         if(status === "idle" && token){
           await Promise.all([dispatch(checkAuth(token)),dispatch(fetchPosts({token})),dispatch(fetchSavedPosts({token})),dispatch(fetchProfile({token}))])
           setStatus("succeeded")
         }
       } catch (error) {
           setStatus("failed");
           setTimeout(() => {
             setStatus("idle");
             localStorage.removeItem("token");
           },2000)
       }
    })()
 },[status,token,dispatch])

  return (
    <div>
       { !login ? 
       <Routes>
           <Route path="/" element={<Login/>}/>
           <Route path="/signup" element={<Signup/>}/>
       </Routes>
        :
        ( status === "succeeded" ? <>
        <Header/>
        { path !== "/" && <ScrollToTop/>}
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
        <Footer/>
        </> : <div className="spinner__container"> <Spinner/> </div> )
       }

       { status === "failed" && <div className="invalid__feedback">Something went wrong !! please try again later</div> }

    </div>
  );
};

export default App;