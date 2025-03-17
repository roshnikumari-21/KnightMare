import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black text-white overflow-hidden">
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
        transition={{ duration: 1.2 }}
        className="relative z-10 max-w-3xl text-center"
      >
        <h1 className="text-6xl font-extrabold text-red-600 animate-pulse">
          Knightmare Chess
        </h1>
        <p className="mt-6 text-lg text-gray-300 leading-relaxed">
          Enter the world of **Knightmare Chess**, where **strategic moves** meet **dark forces**. 
          Beware, for every move could awaken an ancient **curse**. Can you outplay the shadows?
        </p>

        <div className="mt-8 flex justify-center space-x-6">
          <Link to="/play">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 text-lg font-bold text-black bg-red-600 hover:bg-red-800 transition rounded-lg shadow-md"
            >
              Enter the Game
            </motion.button>
          </Link>

          <Link to="/home">
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

export default About;
