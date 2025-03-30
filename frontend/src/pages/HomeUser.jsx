import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { commoncontext } from "../contexts/commoncontext";

const HomeUser = () => {
  const navigate = useNavigate();
  const { setToken, setUser,user,token,backendUrl ,showNavbar , setShowNavbar } = useContext(commoncontext);
  setShowNavbar(true);

  const handle = () => {
    navigate("/playWithAI");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/bg2.jpg')" }}
    >
      <div className="relative z-10 p-6 md:p-10 rounded-xl shadow-2xl text-white max-w-md sm:max-w-xl md:max-w-4xl w-full mx-4 backdrop-blur-xl bg-gray-800/70">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-center sm:text-left">
          <span className="text-red-500">W</span>elcome, {user?.username}
        </h1>
        <p className="text-gray-300 mb-8 text-sm sm:text-base md:text-lg leading-relaxed">
          Step into the world of{" "}
          <span className="text-red-500 font-bold">Knightmare Chess</span>, where{" "}
          <span className="text-gray-400 italic">strategy</span> meets{" "}
          <span className="text-gray-500">darkness</span>. Every move could awaken
          an ancient <span className="text-red-500 font-bold">curse</span>. Are
          you ready to face the shadows?
        </p>
  
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handle}
            className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700 hover:shadow-lg transition-all duration-300"
          >
            Start a Game
          </button>
          <button
            onClick={handle}
            className="bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-600 hover:shadow-lg transition-all duration-300"
          >
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default HomeUser; // ✅ Export the component correctly
