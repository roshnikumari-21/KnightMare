import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { commoncontext } from '../contexts/commoncontext';

const Analysis = () => {
  const {setShowNavbar} = useContext(commoncontext);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [bubbles, setBubbles] = useState([]);
  setShowNavbar(true);

  useEffect(() => {
    
    const bubbleCount = 20;
    const initialBubbles = Array.from({ length: bubbleCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 15 + 5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.1 + 0.05,
    }));
    initialBubbles.push({
      id: bubbleCount,
      size: 12,
      x: 50,
      y: 50,
      opacity: 0.2,
      isFollowing: true
    });
    
    setBubbles(initialBubbles);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);





  return (
    <div className="mt-[6%] bg-gray-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden min-h-[70vh]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble) => {
          const x = bubble.isFollowing ? mousePosition.x : bubble.x;
          const y = bubble.isFollowing ? mousePosition.y : bubble.y;
          
          return (
            <motion.div
              key={bubble.id}
              className="absolute bg-blue-400 rounded-full"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                left: `${x}%`,
                top: `${y}%`,
                opacity: bubble.opacity,
                transform: 'translate(-50%, -50%)'
              }}
              animate={bubble.isFollowing ? {
                left: `${x}%`,
                top: `${y}%`,
              } : {}}
              transition={bubble.isFollowing ? {
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 0.2
              } : {}}
            />
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent h-16 bg-gradient-to-r from-blue-400 to-purple-500">
          Game Analysis Dashboard
        </h1>
        
        <p className="text-xl text-gray-300 mb-8">
          We're crunching the numbers to bring you <span className="text-blue-300 font-medium">deep insights</span> into your gameplay.
          This powerful tool will be ready soon!
        </p>

        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-8">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "65%" }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </div>

        <motion.div
          className="inline-block bg-gray-800 bg-opacity-60 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-700 shadow-lg"
          whileHover={{ y: -2 }}
        >
          <p className="text-blue-300 font-mono flex items-center justify-center">
            <motion.svg 
              className="w-5 h-5 mr-2"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </motion.svg>
            Estimated launch: April 2025
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Analysis;