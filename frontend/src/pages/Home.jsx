import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center" 
      style={{ backgroundImage: "url('/bgchess5.jpg')" }}
    >
      <div className="bg-gray-700/10 p-6 rounded-lg shadow-lg text-white max-w-sm text-center backdrop-blur-sm">

        <h1 className="text-2xl font-bold mb-3">Welcome to KnightMare 
          
        </h1>
        <p className="text-gray-200 mb-4">Enhance your chess skills by playing against AI and tracking your progress.</p>
        <div className="flex flex-col items-center space-y-3">
          <Link
            to="/login"
            className="w-1/4 px-4 py-1 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition"
          >
            Login
          </Link>
         
          <p className="text-black text-sm">
            Don't have an account? <Link to="/signup" className="text-black font-bold hover:text-gray-900 transition">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
