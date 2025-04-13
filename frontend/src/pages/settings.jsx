import React from "react";
import { motion } from "framer-motion";

const Settings = () => {
  const settingOptions = [
    "🔈 Sound: On / Off",
    "🧛 Theme: Dark / Blood Red / Mist",
    "♟️ Board Style: Classic / Haunted / Rune",
    "👻 Piece Style: Bone / Shadow / Phantom",
    "📯 Notifications: On / Off",
    "💀 Scary Mode: Enable Screamer Events",
    "🌐 Language: English / Latin / Gothic",
  ];

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden px-8 py-16">
      
      {/* Glowy Orb - Top */}
      <motion.div
        className="absolute top-[-200px] left-1/2 w-[600px] h-[600px] bg-white opacity-10 blur-3xl rounded-full pointer-events-none"
        animate={{ x: [-30, 30, -30] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glowy Orb - Bottom Right */}
      <motion.div
        className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-white opacity-10 blur-2xl rounded-full pointer-events-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="text-5xl font-bold text-white text-center mb-12"
      >
        Knightmare Settings ⚙️
      </motion.h1>

      {/* Settings List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto z-10 relative">
        {settingOptions.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:bg-white/10 transition duration-300 shadow-lg"
          >
            <h2 className="text-xl text-white font-medium">{option}</h2>
          </motion.div>
        ))}
      </div>

      {/* Footer Quote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: settingOptions.length * 0.15 + 0.5 }}
        className="text-center text-zinc-500 mt-16 italic"
      >
        “In the silence of the void, every move whispers your fate...”
      </motion.p>
    </div>
  );
};

export default Settings;




