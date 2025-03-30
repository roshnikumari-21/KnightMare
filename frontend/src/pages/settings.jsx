import React, { useState } from "react";
import { FaUser, FaLock, FaPalette, FaVolumeUp, FaSave, FaEdit, FaPowerOff } from "react-icons/fa";

const Settings = () => {
  const [username, setUsername] = useState("JohnDoe");
  const [newUsername, setNewUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isSoundOn, setIsSoundOn] = useState(true);

  const handleUsernameChange = () => {
    if (newUsername.trim()) {
      setUsername(newUsername);
      setNewUsername("");
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-lg p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-700 relative">
        
        {/* Profile Avatar */}
        <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-lg">
          <FaUser className="text-4xl text-black" />
        </div>

        <h2 className="text-3xl font-bold text-center mt-8 mb-6">⚙️ Settings</h2>

        <div className="space-y-6">
          {/* Username Update */}
          <div className="bg-gray-800 p-4 rounded-xl flex items-center justify-between border border-gray-600">
            <div className="flex items-center gap-3">
              <FaUser className="text-gray-400 text-lg" />
              {isEditing ? (
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full bg-gray-700 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                  placeholder="Enter new username"
                />
              ) : (
                <span className="font-semibold text-white">{username}</span>
              )}
            </div>
            <button
              className="bg-white hover:bg-gray-300 p-2 rounded-md text-black flex items-center gap-1"
              onClick={() => (isEditing ? handleUsernameChange() : setIsEditing(true))}
            >
              <FaEdit />
            </button>
          </div>

          {/* Change Password */}
          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              className="w-full px-10 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white text-white"
              placeholder="Enter New Password"
            />
          </div>

          {/* Theme Selection */}
          <div className="relative">
            <FaPalette className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <select
              className="w-full px-10 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-white text-white"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light Theme</option>
              <option value="dark">Dark Theme</option>
            </select>
          </div>

          {/* Sound Control */}
          <div className="flex items-center justify-between p-3 bg-gray-800 border border-gray-600 rounded-xl">
            <div className="flex items-center gap-2">
              <FaVolumeUp className="text-gray-400" />
              <span>Sound Effects</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isSoundOn}
                onChange={() => setIsSoundOn(!isSoundOn)}
              />
              <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-white after:absolute after:top-1 after:left-1 after:bg-black after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
            </label>
          </div>

          {/* Logout */}
          <button className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2">
            <FaPowerOff /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;