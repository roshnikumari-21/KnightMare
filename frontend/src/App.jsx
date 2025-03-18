
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Settings from "./pages/settings";
import HomeUser from "./pages/HomeUser";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Play from "./components/Play";
import { ToastContainer} from 'react-toastify';
import Profile from "./pages/Profile";
import { AudioProvider } from "./Context/AudioContext.jsx";
import { commoncontext} from "./contexts/commoncontext.jsx";
import { useContext } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword.jsx";
function App() {
  const {token,user,showNavbar , setShowNavbar} = useContext(commoncontext);
  return (
    <AudioProvider> 
      <div className="h-screen flex flex-col bg-white">
        <ToastContainer/>
       {showNavbar ? <Navbar /> : ""}
        <div className="flex flex-1 overflow-hidden mt-1 bg-slate-900">
          {token ? <Sidebar /> : ""};
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/contact" element={<Contact />} />
              <Route path="/home-user" element={<HomeUser />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/playWithAI" element={<Play />} />
              <Route path="/forgotpassword" element = {<ForgotPassword/>}/>
              <Route path="/resetpassword" element = {<ResetPassword/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </AudioProvider>
  );
}

export default App;