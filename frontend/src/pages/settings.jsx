import React, { useContext } from "react";
import { AudioContext } from "../Context/AudioContext";

const Settings = () => {
  const { isPlaying, playAudio, pauseAudio } = useContext(AudioContext);

  return (
    <div className="p-8 rounded-lg shadow-lg text-white backdrop-blur-sm bg-gray-900/50">
      <h1 className="text-4xl font-bold mb-6 text-red-600" style={{ fontFamily: "'Creepster', cursive" }}>
        Settings
      </h1>

      {/* Sound Controls */}
      <div className="space-y-4">
        <p className="text-lg text-gray-300">
          Sound is currently <span className={isPlaying ? "text-green-500" : "text-red-500"}>{isPlaying ? "ON" : "OFF"}</span>.
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={playAudio}
            disabled={isPlaying}
            className="px-6 py-3 text-lg font-bold text-white bg-green-600 hover:bg-green-700 transition rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Turn Sound ON
          </button>

          <button
            onClick={pauseAudio}
            disabled={!isPlaying}
            className="px-6 py-3 text-lg font-bold text-white bg-red-600 hover:bg-red-700 transition rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Turn Sound OFF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;