import { useEffect, useState } from "react";

import { useAppSelector,useAppDispatch } from "./store/hooks";
import { Route, Routes, useLocation } from "react-router-dom";

import { useWindowSize } from "./utils/custom-hooks/useWindowSize";
import ScrollToTop from "./utils/custom-hooks/ScrollToTop";
import Spinner from "./utils/Spinner/Spinner";
import RouteNotFound from "./utils/RouteNotFound/RouteNotFound";

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
import IndividualPostPage from "./pages/IndividualPostPage/IndividualPostPage";

import { Status } from "./generic.types";

import "./App.css";
import PrivateRoute from "./utils/PrivateRoute/PrivateRoute";

const App = () => {
  const auth = useAppSelector((state) => state.auth);

  const [status,setStatus] = useState<Status>("idle");  
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const path = useLocation().pathname;

  const { token,login } = auth;

  useEffect(() => {
    if(!token){
      setStatus("idle")
    }
    
    (async function(){
         if(status === "idle" && token){
           await Promise.all([dispatch(checkAuth(token)),dispatch(fetchPosts({token})),dispatch(fetchSavedPosts({token})),dispatch(fetchProfile({token}))])
           setStatus("succeeded")
         }
    })()
 },[status,token,dispatch])

  return (
    <div>
       { login && status === "succeeded" && <Header/>}

       <Routes>
          { !login && <Route path="/" element={<Login/>}/>}
          { !login && <Route path="/signup" element={<Signup/>}/>}
          { !login && <Route path="*" element={<RouteNotFound/>}/>}
       </Routes>

       { status === "succeeded" &&
         <Routes>
           { path !== "/" && <ScrollToTop/>}
           { 
             width >= 700 &&
             <PrivateRoute path="/chats" element={<Chats/>}>
               <PrivateRoute path="/:chatId" element={<UserChatsDesktop/>}/>
             </PrivateRoute> 
           } 
           { width < 700 && <PrivateRoute path="/chats" element={<Chats/>}/>}
           { width < 700 && <PrivateRoute path="/chats/:chatId" element={<UserChatsMobile/>}/>}
           
           <PrivateRoute path="/" element={<Home/>}/>
           <PrivateRoute path="/profile" element={<Profile/>}>
              <PrivateRoute path="/" element={<PostsSection/>}/>
              <PrivateRoute path="/save" element={<PostsSection/>}/>
           </PrivateRoute>
           <PrivateRoute path="/profile/edit" element={<EditProfile/>}/>
           <PrivateRoute path="/followers/:userId" element={<Followers/>}/>
           <PrivateRoute path="/following/:userId" element={<Following/>}/>
           <PrivateRoute path="/viewprofile/:userId" element={<ViewProfile/>}/>
           <PrivateRoute path="/comments/:postId" element={<Comments/>}/>
           <PrivateRoute path="/search" element={<Search/>}/>
           <PrivateRoute path="/activity" element={<Activity/>}/>
           <PrivateRoute path="/post/add" element={<AddPost/>}/>
           <PrivateRoute path="/posts/:postId" element={<IndividualPostPage/>}/>
           <Route path="*" element={<RouteNotFound/>}/>
        </Routes>}

        { login && status === "succeeded" && <Footer/>}

        { login && status !== "succeeded" && <div className="spinner__container"> <Spinner/> </div> }
 
        { login && status === "failed" && <div className="invalid__feedback">Something went wrong !! please try again later</div> }

    </div>
  );
};

export default App;