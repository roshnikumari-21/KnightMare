import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const HomeUser = () => {
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  const handle = () => {
    navigate("/playWithAI");
  };

  return (
    <div
      style={{
        backgroundImage: "url('/bg2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="relative heii z-10 p-8 rounded-lg shadow-lg text-white max-w-4xl w-full mx-4  ">
          {/* Header */}
          <h1 className="text-5xl font-semibold mb-6">
            <span className="text-red-500">W</span>elcome, Username
          </h1>
          <p className="text-gray-300 mb-8">
            Step into the world of{" "}
            <span className="text-red-500 font-bold">Knightmare Chess</span>,
            where <span className="text-gray-400 italic">strategy</span> meets{" "}
            <span className="text-gray-500">darkness</span>. Every move could
            awaken an ancient{" "}
            <span className="text-red-500 font-bold">curse</span>. Are you ready
            to face the shadows?
          </p>

          {/* Action Buttons */}
          <button
            onClick={handle}
            className="bg-white text-black font-semibold px-4 mr-6 py-2 hover:bg-slate-300 rounded-sm"
          >
            Start a Game
          </button>
          <button
            onClick={handle}
            className="bg-white text-black font-semibold px-4 py-2 hover:bg-slate-300 rounded-sm"
          >
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeUser; // ✅ Export the component correctly
