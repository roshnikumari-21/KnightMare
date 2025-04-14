



import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { commoncontext } from "../contexts/commoncontext";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaChessKnight,
  FaChessQueen,
  FaChessBoard,
  FaChessRook,
  FaChessPawn,
} from "react-icons/fa";
import { GiChessKing, GiChessBishop } from "react-icons/gi";

const HomeUser = () => {
  const navigate = useNavigate();
  const { setUser, user, setShowNavbar } = useContext(commoncontext);

  useEffect(() => {
    setShowNavbar(true);
  }, [setShowNavbar]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 20px rgba(99, 102, 241, 0.6)",
      transition: {
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const chessPieceVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const handlePlay = () => {
    navigate("/playWithAI");
  };

  const handleAnalyze = () => {
    navigate("/analysis");
  };

  const handlePuzzles = () => {
    navigate("/puzzles");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Chess piece decorative elements */}
      <motion.div
        variants={chessPieceVariants}
        animate="float"
        className="absolute top-20 left-10 text-blue-400 opacity-20 text-6xl md:text-6xl"
      >
        <FaChessRook />
      </motion.div>
      <motion.div
        variants={chessPieceVariants}
        animate="float"
        style={{ y: [0, -20, 0] }}
        className="absolute bottom-20 right-10 text-purple-400 opacity-20 text-7xl md:text-6xl"
      >
        <GiChessKing />
      </motion.div>
      {/* <motion.div
        variants={chessPieceVariants}
        animate="float"
        style={{ y: [0, -10, 0] }}
        className="absolute top-1/3 right-1/4 text-green-400 opacity-20 text-5xl md:text-7xl"
      >
        <GiChessBishop />
      </motion.div> */}

      <div className="absolute inset-0 bg-[url('/chess-pattern.svg')] opacity-5" />

      <div
        ref={ref}
        className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative z-10 p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl text-white w-full max-w-4xl mx-4 backdrop-blur-sm bg-gray-900/70 border border-gray-700"
        >
          {/* Header with chess icon */}
          <div className="flex items-center justify-start mb-2">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent h-20 md:h-20 bg-gradient-to-r from-blue-400 to-blue-600"
            >
              Welcome, {user?.username}
            </motion.h1>
          </div>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 mb-8 text-lg md:text-xl leading-relaxed "
          >
            Command your <span className="text-blue-400 font-medium">army</span>{" "}
            in the ultimate{" "}
            <span className="text-purple-400">battle of wits</span>. Every move
            is a <span className="italic text-gray-200">calculated risk</span>{" "}
            in this <span className="text-blue-400">64-square</span>{" "}
            battlefield.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8"
          >
            <motion.button
              onClick={handlePlay}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-4 rounded-lg text-lg shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              <FaChessKnight className="mr-3 text-xl" />
              Play Against AI
            </motion.button>

            <motion.button
              onClick={handleAnalyze}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-transparent border-blue-500 border hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-4 rounded-lg text-lg shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              <FaChessQueen className="mr-3 " />
              Analyze Game
            </motion.button>
          </motion.div>

          {/* Quick Tips Section */}
          <motion.div
            variants={itemVariants}
            className="mt-12 bg-gray-800/50 border border-gray-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-400">
              <FaChessBoard className="mr-2" /> Pro Tip
            </h3>
            <p className="text-gray-300">
              "Control the center of the board to gain more space and better
              piece mobility. Remember -{" "}
              <span className="text-blue-400">
                every pawn move weakens squares
              </span>{" "}
              behind it."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeUser;
