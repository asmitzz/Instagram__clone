import Signup from "./auth/signup/signup";
import Login from "./auth/login/Login";

import { Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div>
       <Routes>
           <Route path="/signup" element={<Signup/>}/>
           <Route path="/" element={<Login/>}/>
           <Route path="/login" element={<Login/>}/>
       </Routes>
    </div>
  );
};

export default App;
