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
import { useNavigate } from "react-router";

const HomeUser = () => {

  const navigate=useNavigate();


    const handle = () => {
        
        navigate("/playWithAI");
      };
    

    
  return (
    <div
      style={{
        backgroundImage:
          "url('/homeuser.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="relative z-10 p-8 rounded-lg shadow-lg text-white max-w-4xl w-full mx-4 backdrop-blur-sm ">
          {/* Header */}
          <h1 className="text-5xl font-semibold mb-6">  <span className="text-red-500">W</span>elcome, Username</h1>
          <p className=" text-gray-300 mb-8">
            Step into the world of{" "}
            <span className="text-red-500 font-bold">Knightmare Chess</span>,
            where <span className="text-gray-400 italic">strategy</span> meets{" "}
            <span className="text-gray-500">darkness</span>. Every move could
            awaken an ancient{" "}
            <span className="text-red-500 font-bold">curse</span>. Are you ready
            to face the shadows?
          </p>

          {/* Action Buttons */}
          <button onClick={handle} className="border-white border-2 px-4 py-2 rounded-sm">Start a Game </button>
          

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

export default HomeUser;