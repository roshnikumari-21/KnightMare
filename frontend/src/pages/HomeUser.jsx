



import { useEffect,useRef } from "react";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import horrorEntry from "../assets/horrorEntry.wav";



const HomeUser = () => {

    const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.click(); // Auto-click hidden button
    }
  }, []);

  const playSound = () => {
    const sound = new Audio(horrorEntry);
    sound.volume = 1.0;
    sound.currentTime = 1;
    sound.play().catch((err) => console.log("Autoplay blocked:", err));
  };
   
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-dark-clouds-in-the-sky-2483-large.mp4" type="video/mp4" />
      </video>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5 }}
        className="relative z-10 max-w-3xl text-center"
      >
        <button ref={buttonRef} onClick={playSound} className="hidden"></button>
        <h1 
          className="text-6xl text-red-600 animate-pulse"
          style={{ fontFamily: "'Creepster', cursive" }}
        >
          Knightmare Chess
        </h1>
        <p className="mt-6 text-lg text-gray-300 leading-relaxed">
          Enter the world of <span className="text-red-500 font-bold">Knightmare Chess</span>, where <span className="text-gray-400 italic">strategic moves</span> meet <span className="text-gray-500">dark forces</span>. 
          Beware, for every move could awaken an ancient <span className="text-red-600 font-bold">curse</span>. Can you outplay the shadows?
        </p>

        <div className="mt-8 flex justify-center space-x-6">
          <Link to="/playWithAI">
            <motion.button
           
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 text-lg font-bold text-black bg-red-600 hover:bg-red-800 transition rounded-lg shadow-md"
            >
              Enter the Game
            </motion.button>
          </Link>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 text-lg font-bold text-red-600 border border-red-600 hover:bg-red-600 hover:text-black transition rounded-lg shadow-md"
            >
              Back to Safety
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeUser;
