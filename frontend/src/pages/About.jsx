

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { commoncontext } from "../contexts/commoncontext";

const RulesPage = () => {
  const { token, user, showNavbar, setShowNavbar } = useContext(commoncontext);
  setShowNavbar(true);
  const [activeTab, setActiveTab] = useState("basic");
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const teamMembers = [
    { name: "Aprajita Kumari", role: "The Strategist", specialty: "Master of piece resurrection" },
    { name: "Roshni Kumari", role: "The Visionary", specialty: "Expert in unseen maneuvers" },
    { name: "Sakshi Kumari", role: "The Chronomancer", specialty: "Controller of game tempo" },
    { name: "Ayush Kumar Singh", role: "The Architect", specialty: "Designer of game structures" },
    { name: "Prince Kumar", role: "The Illusionist", specialty: "Creator of tactical deceptions" },
    { name: "Gobind Kumar", role: "The Enforcer", specialty: "Guardian of game integrity" },
  ];

  return (
    <div className="bg-gray-950 min-h-screen text-white font-sans">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 relative z-10">
        {/* Animated Title */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-center mb-8 md:mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-gray-800">
            KNIGHTMARE CHESS
          </h1>
          <p className="text-lg md:text-xl text-blue-200 italic">
            "Where strategy meets the shadows..."
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center mb-8 md:mb-12 border-b border-gray-800"
        >
          <button
            onClick={() => setActiveTab("basic")}
            className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium ${activeTab === "basic" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
          >
            Basic Rules
          </button>
          <button
            onClick={() => setActiveTab("penalties")}
            className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium ${activeTab === "penalties" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
          >
            Game Penalties
          </button>
          <button
            onClick={() => setActiveTab("resignation")}
            className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium ${activeTab === "resignation" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
          >
            Resignation
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium ${activeTab === "team" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
          >
            The Team
          </button>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-800 p-4 md:p-8"
        >
          {/* Basic Rules */}
          {activeTab === "basic" && (
            <motion.div variants={fadeIn}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-blue-400">The Core Rules</h2>
              <div className="space-y-4 md:space-y-6">
                <motion.div variants={fadeIn} className="p-4 md:p-6 bg-gray-800/50 rounded-lg border-l-4 border-blue-600">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">1. Piece Movement</h3>
                  <p className="text-gray-300">Standard chess piece movements with these enhancements:</p>
                  <ul className="list-disc pl-4 md:pl-6 mt-2 space-y-1 md:space-y-2 text-gray-400">
                    <li>Pawns can promote to any captured piece</li>
                    <li>Bishops gain an extra square on diagonal moves</li>
                    <li>Castling can be done with any rook if path is clear</li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="p-4 md:p-6 bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">2. Check & Checkmate</h3>
                  <p className="text-gray-300">Special conditions for victory:</p>
                  <ul className="list-disc pl-4 md:pl-6 mt-2 space-y-1 md:space-y-2 text-gray-400">
                    <li>Three checks in a row grants a tempo advantage</li>
                    <li>Checkmate must be confirmed by opponent</li>
                    <li>Stalemate results in piece sacrifice for both players</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Penalties */}
          {activeTab === "penalties" && (
            <motion.div variants={fadeIn}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-blue-400">Game Penalties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <motion.div variants={fadeIn} className="p-4 md:p-6 bg-gray-800/50 rounded-lg border border-blue-900">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 flex items-center">
                    <span className="text-blue-400 mr-2">⚔️</span> Illegal Moves
                  </h3>
                  <ul className="list-disc pl-4 md:pl-6 mt-2 space-y-1 md:space-y-2 text-gray-400">
                    <li>2 minute time penalty</li>
                    <li>Opponent gains a tempo advantage</li>
                    <li>Three offenses result in match suspension</li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="p-4 md:p-6 bg-gray-800/50 rounded-lg border border-blue-800">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 flex items-center">
                    <span className="text-blue-300 mr-2">⏳</span> Time Violations
                  </h3>
                  <ul className="list-disc pl-4 md:pl-6 mt-2 space-y-1 md:space-y-2 text-gray-400">
                    <li>Additional rating point loss</li>
                    <li>Next game starts with time disadvantage</li>
                    <li>Repeated violations slow your piece movement</li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="p-4 md:p-6 bg-gray-800/50 rounded-lg border border-blue-700">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 flex items-center">
                    <span className="text-blue-200 mr-2">⚠️</span> Abandoned Games
                  </h3>
                  <ul className="list-disc pl-4 md:pl-6 mt-2 space-y-1 md:space-y-2 text-gray-400">
                    <li>Rating penalty multiplier</li>
                    <li>Temporary matchmaking restrictions</li>
                    <li>Persistent abandonment leads to queue penalties</li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="p-4 md:p-6 bg-gray-800/50 rounded-lg border border-blue-600">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 flex items-center">
                    <span className="text-blue-100 mr-2">🔍</span> Fair Play
                  </h3>
                  <ul className="list-disc pl-4 md:pl-6 mt-2 space-y-1 md:space-y-2 text-gray-400">
                    <li>First offense: Game restrictions</li>
                    <li>Second offense: Temporary suspension</li>
                    <li>Third offense: Permanent account termination</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Resignation */}
          {activeTab === "resignation" && (
            <motion.div variants={fadeIn}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-blue-400">Resignation Protocol</h2>
              <div className="space-y-4 md:space-y-6">
                <motion.div variants={fadeIn} className="p-4 md:p-6 bg-gray-800/50 rounded-lg border-l-4 border-blue-600">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">When to Resign</h3>
                  <ul className="list-disc pl-4 md:pl-6 mt-2 space-y-1 md:space-y-2 text-gray-400">
                    <li>When material disadvantage is significant</li>
                    <li>When king safety cannot be maintained</li>
                    <li>When opponent has clear winning path</li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="p-4 md:p-6 bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">How to Resign</h3>
                  <ul className="list-disc pl-4 md:pl-6 mt-2 space-y-1 md:space-y-2 text-gray-400">
                    <li>Type "/resign" in game chat</li>
                    <li>Click the resign button in menu</li>
                    <li>Confirm your resignation</li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="p-4 md:p-6 bg-gray-800/50 rounded-lg border-l-4 border-blue-400">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Improper Resignation</h3>
                  <ul className="list-disc pl-4 md:pl-6 mt-2 space-y-1 md:space-y-2 text-gray-400">
                    <li>Abandoning counts as double loss</li>
                    <li>Temporary rating penalties apply</li>
                    <li>Repeated offenses trigger matchmaking delays</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Team */}
          {activeTab === "team" && (
            <motion.div variants={fadeIn}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-blue-400">The Development Team</h2>
              <p className="text-blue-200 mb-6 md:mb-8 italic text-center">
                "Dedicated to creating the ultimate chess experience"
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {teamMembers.map((member, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeIn}
                    whileHover={{ scale: 1.03 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-md  hover:shadow-blue-400 transition-all"
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex items-center mb-3 md:mb-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-700 flex items-center justify-center text-xl md:text-2xl font-bold text-blue-300">
                          {member.name.charAt(0)}
                        </div>
                        <div className="ml-3 md:ml-4">
                          <h3 className="text-base md:text-lg font-bold text-white">{member.name}</h3>
                          <p className="text-blue-400 text-sm md:text-base">{member.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-400 italic text-sm md:text-base">"{member.specialty}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                variants={fadeIn}
                className="mt-8 md:mt-12 p-4 md:p-6 bg-gray-900 rounded-lg border border-gray-800 text-center"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Join Our Team</h3>
                <p className="text-gray-400 mb-3 md:mb-4 text-sm md:text-base">
                  Interested in contributing to Knightmare Chess?
                </p>
                <button className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors text-sm md:text-base">
                  Contact Us
                </button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Animated Chess Pieces (Mobile Hidden) */}
        <div className="hidden md:block">
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-10 text-4xl opacity-20 text-blue-300"
          >
            ♜
          </motion.div>
          <motion.div 
            animate={{ 
              y: [0, 50, 0],
              rotate: [0, -15, 15, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 7,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute bottom-1/3 right-20 text-4xl opacity-20 text-blue-300"
          >
            ♛
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full py-4 bg-gradient-to-t from-blue-900/70 to-transparent mt-8 md:mt-16 flex items-center justify-center">
        <p className="text-gray-400 text-xs md:text-sm">
          © {new Date().getFullYear()} Knightmare Chess - All rights reserved
        </p>
      </div>
    </div>
  );
};

export default RulesPage;