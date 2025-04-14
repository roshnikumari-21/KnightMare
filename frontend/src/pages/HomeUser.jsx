import React, { useContext, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { commoncontext } from "../contexts/commoncontext";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ChessModelBackground from "../components/ChessModelBackground";
import { Canvas } from "@react-three/fiber";

const HomeUser = () => {
  const navigate = useNavigate();
  const { setUser, user, setShowNavbar } = useContext(commoncontext);
  
  // Set navbar visibility on mount
  useEffect(() => {
    setShowNavbar(true);
  }, [setShowNavbar]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.4)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        yoyoInfinity: 0.5
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const handlePlay = () => {
    navigate("/playWithAI");
  };

  const handleAnalyze = () => {
    // Add analyze functionality here
    console.log("Analyze clicked");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-black"
    >
      <Suspense fallback={null}>
        <Canvas
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
          camera={{ position: [0, 0, 5], fov: 45 }}
        >
          <ChessModelBackground />
        </Canvas>
      </Suspense>

      <div
        ref={ref}
        className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 py-12"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative z-10 p-8 rounded-lg backdrop-blur-md bg-black/30 border border-white/10 text-white max-w-4xl w-full mx-4"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
          >
            Welcome, {user?.username}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-300 mb-10 text-lg leading-relaxed"
          >
            Step into the world of{" "}
            <span className="text-blue-400 font-bold">Knightmare Chess</span>,
            where <span className="italic text-gray-200">strategy</span> meets{" "}
            <span className="text-gray-400">darkness</span>. Every move could
            awaken an ancient{" "}
            <span className="text-blue-400 font-bold">curse</span>. Are you ready
            to face the shadows?
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 mt-8"
          >
            <motion.button
              onClick={handlePlay}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow-lg transition-all duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Play Against AI
            </motion.button>
            
            <motion.button
              onClick={handleAnalyze}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 font-semibold px-8 py-3 rounded-lg text-lg shadow-lg transition-all duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Analyze Game
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeUser;