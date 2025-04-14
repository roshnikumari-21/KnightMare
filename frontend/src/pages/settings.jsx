


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChessKnight, FaChessBoard, FaVolumeUp, FaVolumeMute, FaBell, FaLanguage } from "react-icons/fa";
import { GiStonePath, GiGhost, GiSpellBook } from "react-icons/gi";

const Settings = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [settings, setSettings] = useState({
    sound: true,
    theme: "midnight",
    boardStyle: "haunted",
    pieceStyle: "spectral",
    notifications: true,
    scaryMode: false,
    language: "english"
  });

  const settingOptions = [
    {
      id: "sound",
      icon: settings.sound ? <FaVolumeUp className="text-blue-400" /> : <FaVolumeMute className="text-gray-500" />,
      label: "Sound",
      options: ["On", "Off"],
      type: "toggle"
    },
    {
      id: "theme",
      icon: <FaChessBoard className="text-purple-400" />,
      label: "Theme",
      options: ["Midnight", "Blood Moon", "Ethereal Mist"],
      type: "select"
    },
    
   
    {
      id: "notifications",
      icon: <FaBell className={settings.notifications ? "text-yellow-400" : "text-gray-500"} />,
      label: "Notifications",
      options: ["On", "Off"],
      type: "toggle"
    },
    {
      id: "scaryMode",
      icon: <FaChessKnight className={settings.scaryMode ? "text-red-500 animate-pulse" : "text-gray-400"} />,
      label: "Profile Settings",
      options: ["Enable"],
      type: "checkbox"
    },
    {
      id: "language",
      icon: <FaLanguage className="text-cyan-400" />,
      label: "Language",
      options: ["English", "Latin", "Eldritch"],
      type: "select"
    }
  ];

  const toggleSetting = (id) => {
    if (settingOptions.find(o => o.id === id)?.type === "toggle") {
      setSettings(prev => ({ ...prev, [id]: !prev[id] }));
    }
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const selectOption = (id, value) => {
    const newValue = settingOptions.find(o => o.id === id)?.type === "toggle"
      ? value === "On"
      : value.toLowerCase();
    setSettings(prev => ({ ...prev, [id]: newValue }));
    setActiveDropdown(null);
  };

  return (
    <>
     <div className="bg-gray-950 min-h-screen text-white font-sans">
       <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[length:80px_80px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]"></div>
     </div>
    <div className="relative  min-h-screen text-gray-100 font-sans overflow-hidden">
     

      {/* Chess Divider Elements */}
      <div className="absolute left-0 right-0 top-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute left-0 right-0 bottom-40 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="relative max-w-md mx-auto py-12 px-6">
        {/* Header with Chess Knight */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center mb-8"
        >
          <FaChessKnight className="text-4xl text-white mr-4" />
          <h1 className="text-3xl font-bold bg-clip-text text-white">
            Game Settings
          </h1>
          <FaChessKnight className="text-4xl text-white ml-4 transform scale-x-[-1]" />
        </motion.div>

        {/* Settings List */}
        <div className="space-y-1">
          {settingOptions.map((option) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden"
            >
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition"
                onClick={() => toggleSetting(option.id)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center mr-3">
                    {option.icon}
                  </div>
                  <h3 className="font-medium">{option.label}</h3>
                </div>
                
                <div className="flex items-center">
                <span className="text-sm text-gray-400 mr-2">
  {option.type === "toggle" 
    ? settings[option.id] ? "On" : "Off"
    : typeof settings[option.id] === 'string' 
      ? settings[option.id].charAt(0).toUpperCase() + settings[option.id].slice(1)
      : String(settings[option.id])}
</span>
                  {option.type !== "checkbox" && (
                    <motion.div
                      animate={{ rotate: activeDropdown === option.id ? 180 : 0 }}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {activeDropdown === option.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 pt-1 space-y-1">
                      {option.options.map((opt) => (
                        <div
                          key={opt}
                          className={`px-3 py-2 rounded-md cursor-pointer text-sm transition ${
                            (option.type === "toggle" && ((opt === "On" && settings[option.id]) || (opt === "Off" && !settings[option.id]))) ||
                            (option.type !== "toggle" && settings[option.id] === opt.toLowerCase())
                              ? 'bg-blue-900/50 text-blue-100'
                              : 'hover:bg-gray-800/50 text-gray-300'
                          }`}
                          onClick={() => selectOption(option.id, opt)}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium transition"
          >
            Reset Defaults
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium transition shadow-lg shadow-amber-500/10"
          >
            Apply Settings
          </motion.button>
        </motion.div>

        {/* Footer with subtle chess reference */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-500 mt-12 italic"
        >
          "Every move echoes in eternity - choose your path wisely"
        </motion.p>
      </div>
    </div>
    <div className="w-full py-4 bg-gradient-to-t from-blue-900/70 to-transparent mt-8 md:mt-16 flex items-center justify-center">
        <p className="text-gray-400 text-xs md:text-sm">
          © {new Date().getFullYear()} Knightmare Chess - All rights reserved
        </p>
      </div>
    </div>
    </>
  );
};

export default Settings;