import {React, useRef,useEffect}from "react";
import { Link } from "react-router-dom";
import { AudioContext } from "../Context/AudioContext";
import { commoncontext} from "../contexts/commoncontext.jsx";
import { useContext } from "react";
import HomeUser from '../pages/HomeUser.jsx'
const Home = () => {
  const {token,user,showNavbar , setShowNavbar} = useContext(commoncontext);
   setShowNavbar(true);

  if (token) {
    return <HomeUser />;
  }
  return (
    <div 
      className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center p-6" 
      style={{ backgroundImage: "url('/bgchess5.jpg')" }}
    >
      <div className="bg-gray-800/70 p-8 rounded-lg shadow-xl text-white max-w-sm md:max-w-md text-center backdrop-blur-lg">
        <h1 className="text-3xl font-extrabold mb-4 tracking-wide">
          Welcome to <span className="text-red-500">KnightMare</span>
        </h1>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Enhance your chess skills by playing against AI and tracking your progress.
        </p>
        
        <div className="flex flex-col items-center space-y-4">
          <Link
            to="/login"
            className="w-full px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
          >
            Login
          </Link>
          
          <p className="text-gray-300 text-sm">
            Don't have an account? 
            <Link 
              to="/register" 
              className="text-red-400 font-bold hover:text-red-300 transition duration-200 ml-1"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
  
  
};

export default Home;

