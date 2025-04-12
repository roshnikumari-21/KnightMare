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
    { name: "Aprajita Kumari", role: "The Necromancer", specialty: "Raises dead pieces from the graveyard" },
    { name: "Roshni Kumari", role: "The Shadowmancer", specialty: "Moves unseen in the darkness" },
    { name: "Sakshi Kumari", role: "The Timekeeper", specialty: "Controls the clock of doom" },
    { name: "Ayush Kumar Singh", role: "The Architect", specialty: "Builds the labyrinth of despair" },
    { name: "Prince Kumar", role: "The Illusionist", specialty: "Creates visions of false moves" },
    { name: "Gobind Kumar", role: "The Torturer", specialty: "Inflicts pain on rule-breakers" },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 font-sans bg-[url('/dark-chess-bg.jpg')] bg-cover bg-fixed bg-blend-overlay">
      {/* Blood Drip Decoration */}
      <div className="absolute top-0 left-0 w-full h-2 bg-red-900 opacity-70"></div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        {/* Animated Title */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-800">
            KNIGHTMARE CHESS
          </h1>
          <p className="text-xl text-gray-300 italic">
            "Where every move could be your last..."
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-12 border-b border-gray-700"
        >
          <button
            onClick={() => setActiveTab("basic")}
            className={`px-6 py-3 font-medium ${activeTab === "basic" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400 hover:text-white"}`}
          >
            Basic Rules
          </button>
          <button
            onClick={() => setActiveTab("penalties")}
            className={`px-6 py-3 font-medium ${activeTab === "penalties" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400 hover:text-white"}`}
          >
            Dark Penalties
          </button>
          <button
            onClick={() => setActiveTab("resignation")}
            className={`px-6 py-3 font-medium ${activeTab === "resignation" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400 hover:text-white"}`}
          >
            Forbidden Resignation
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`px-6 py-3 font-medium ${activeTab === "team" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400 hover:text-white"}`}
          >
            The Architects
          </button>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-800 p-8"
        >
          {/* Basic Rules */}
          {activeTab === "basic" && (
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold mb-6 text-red-500">The Ancient Laws</h2>
              <div className="space-y-6">
                <motion.div variants={fadeIn} className="p-6 bg-gray-800/50 rounded-lg border-l-4 border-red-700">
                  <h3 className="text-xl font-semibold text-white mb-2">1. Movement of the Damned</h3>
                  <p className="text-gray-300">Pieces move as in traditional chess, but with these cursed exceptions:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-400">
                    <li>Pawns may sacrifice themselves to summon a minor demon (knight)</li>
                    <li>Bishops move through mirrors in this realm</li>
                    <li>The King's shadow moves one extra square when castled</li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="p-6 bg-gray-800/50 rounded-lg border-l-4 border-purple-700">
                  <h3 className="text-xl font-semibold text-white mb-2">2. Check & Checkmate</h3>
                  <p className="text-gray-300">When the Dark King is threatened:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-400">
                    <li>Three consecutive checks summon the Blood Knight</li>
                    <li>Checkmate must be confirmed by the opponent's scream</li>
                    <li>Stalemate results in both players losing a piece randomly</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Penalties */}
          {activeTab === "penalties" && (
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold mb-6 text-red-500">Punishments of the Abyss</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={fadeIn} className="p-6 bg-gray-800/50 rounded-lg border border-red-900">
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                    <span className="text-red-500 mr-2">⚔️</span> Illegal Moves
                  </h3>
                  <p className="text-gray-300">Moving a piece illegally will:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-400">
                    <li>Cost you 2 minutes of your time</li>
                    <li>Summon a ghost piece for your opponent</li>
                    <li>Mark your soul (3 offenses banishes you for 24 hours)</li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="p-6 bg-gray-800/50 rounded-lg border border-purple-900">
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                    <span className="text-purple-500 mr-2">⏳</span> Time Violations
                  </h3>
                  <p className="text-gray-300">Running out of time has consequences:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-400">
                    <li>Your rating will bleed (lose extra points)</li>
                    <li>The Time Reaper takes a random piece from your next game</li>
                    <li>3 timeouts in a week curses your account with slower piece movement</li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="p-6 bg-gray-800/50 rounded-lg border border-yellow-600">
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                    <span className="text-yellow-500 mr-2">👻</span> Abandoned Games
                  </h3>
                  <p className="text-gray-300">Leaving a game unfinished:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-400">
                    <li>Your pieces become haunted in future games</li>
                    <li>The Chess Revenant will hunt your rating</li>
                    <li>Persistent abandonment locks you in the Dungeon matchmaking queue</li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="p-6 bg-gray-800/50 rounded-lg border border-green-900">
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                    <span className="text-green-500 mr-2">💀</span> Cheating
                  </h3>
                  <p className="text-gray-300">The ultimate sin in Knightmare Chess:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-400">
                    <li>First offense: All pieces turn against you for 7 games</li>
                    <li>Second offense: Account suspended in the Void for 30 days</li>
                    <li>Third offense: Permanent banishment to the Shadow Realm</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Resignation */}
          {activeTab === "resignation" && (
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold mb-6 text-red-500">The Art of Surrender</h2>
              <div className="space-y-6">
                <motion.div variants={fadeIn} className="p-6 bg-gray-800/50 rounded-lg border-l-4 border-red-700">
                  <h3 className="text-xl font-semibold text-white mb-2">When to Resign</h3>
                  <p className="text-gray-300">Resignation is permitted when:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-400">
                    <li>The Dark Oracle predicts less than 5% chance of survival</li>
                    <li>Your King is surrounded by 3 or more enemy pieces</li>
                    <li>You've lost your Queen and both Rooks</li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="p-6 bg-gray-800/50 rounded-lg border-l-4 border-purple-700">
                  <h3 className="text-xl font-semibold text-white mb-2">Resignation Ritual</h3>
                  <p className="text-gray-300">Proper resignation requires:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-400">
                    <li>Type "/resign" in the chat to summon the resignation menu</li>
                    <li>Confirm your surrender by clicking the bleeding skull</li>
                    <li>Your King must be sacrificed (clicked) to complete the ritual</li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="p-6 bg-gray-800/50 rounded-lg border-l-4 border-yellow-600">
                  <h3 className="text-xl font-semibold text-white mb-2">Improper Resignation</h3>
                  <p className="text-gray-300">Abandoning without the ritual:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-400">
                    <li>Counts as 2 losses for rating purposes</li>
                    <li>Your next game starts with a missing pawn</li>
                    <li>The Chess Wraith will whisper your shame to other players</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Team */}
          {activeTab === "team" && (
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold mb-6 text-red-500">The Architects of Despair</h2>
              <p className="text-gray-400 mb-8 italic text-center">
                "We don't just create games... we craft nightmares"
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeIn}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-red-500 transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-2xl">
                          {member.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-white">{member.name}</h3>
                          <p className="text-red-500">{member.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-400 italic">"{member.specialty}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                variants={fadeIn}
                className="mt-12 p-6 bg-black/50 rounded-lg border border-gray-800 text-center"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Join Our Cult</h3>
                <p className="text-gray-400 mb-4">
                  Want to contribute to the nightmare? We're always looking for new tormentors...
                </p>
                <button className="px-6 py-3 bg-red-900 hover:bg-red-800 text-white rounded-lg font-medium transition-colors">
                  Apply for Torture
                </button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Animated Chess Pieces */}
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
          className="absolute top-1/4 left-10 text-4xl opacity-20"
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
          className="absolute bottom-1/3 right-20 text-4xl opacity-20"
        >
          ♛
        </motion.div>
      </div>

      {/* Blood Pool Footer */}
      <div className="w-full h-16 bg-gradient-to-t from-red-900/70 to-transparent mt-16 flex items-center justify-center">
        <p className="text-gray-400 text-sm">
          © 2023 Knightmare Chess - All rights reserved... or suffer the consequences
        </p>
      </div>
    </div>
  );
};

export default RulesPage;

