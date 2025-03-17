


import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChess,
  faChartLine,
  faTrophy,
  faBookOpen,
  faPuzzlePiece,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div style={{
      backgroundImage: "url('https://www.shutterstock.com/image-photo/empty-chess-board-smoke-float-600nw-1718973463.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Main Content */}
      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <div className="relative z-10 p-8 rounded-lg shadow-lg text-white max-w-4xl w-full mx-4 backdrop-blur-sm bg-gray-900/50">
          {/* Header */}
          <h1 className="text-5xl font-bold mb-6 text-red-600" style={{ fontFamily: "'Creepster', cursive" }}>
            Welcome, Teentigada
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Step into the world of <span className="text-red-500 font-bold">Knightmare Chess</span>, where{" "}
            <span className="text-gray-400 italic">strategy</span> meets{" "}
            <span className="text-gray-500">darkness</span>. Every move could awaken an ancient{" "}
            <span className="text-red-600 font-bold">curse</span>. Are you ready to face the shadows?
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Play Against AI */}
            <Link to="/playWithAI">
              <button className="w-full px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-700 to-black hover:from-red-700 hover:to-red-800 transition rounded-lg shadow-lg flex items-center justify-center space-x-2">
                <FontAwesomeIcon icon={faChess} />
                <span>Play Against AI</span>
              </button>
            </Link>

            {/* Analyze Games */}
            <Link to="/analyze">
              <button className="w-full px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-800 to-black hover:from-purple-700 hover:to-purple-800 transition rounded-lg shadow-lg flex items-center justify-center space-x-2">
                <FontAwesomeIcon icon={faChartLine} />
                <span>Analyze Games</span>
              </button>
            </Link>

            {/* View Leaderboard */}
            <Link to="/leaderboard">
              <button className="w-full px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-800 to-black hover:from-green-700 hover:to-green-800 transition rounded-lg shadow-lg flex items-center justify-center space-x-2">
                <FontAwesomeIcon icon={faTrophy} />
                <span>View Leaderboard</span>
              </button>
            </Link>

            {/* Practice Openings */}
            <Link to="/practice">
              <button className="w-full px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-800 to-black hover:to-blue-800 transition rounded-lg shadow-lg flex items-center justify-center space-x-2">
                <FontAwesomeIcon icon={faBookOpen} />
                <span>Practice Openings</span>
              </button>
            </Link>

            {/* Solve Puzzles */}
            <Link to="/puzzles">
              <button className="w-full px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-yellow-800 to-black hover:from-yellow-700 hover:to-yellow-800 transition rounded-lg shadow-lg flex items-center justify-center space-x-2">
                <FontAwesomeIcon icon={faPuzzlePiece} />
                <span>Solve Puzzles</span>
              </button>
            </Link>

            {/* Settings */}
            <Link to="/settings">
              <button className="w-full px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-800 transition rounded-lg shadow-lg flex items-center justify-center space-x-2">
                <FontAwesomeIcon icon={faCog} />
                <span>Settings</span>
              </button>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-12">
            <p className="text-gray-400 text-sm">
              Ready to face the shadows? Choose your path wisely...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;