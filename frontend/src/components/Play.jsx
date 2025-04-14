import React, { useContext, useState, useEffect } from "react";
import Chess from "./Chess";
import GameSetup from "./GameSetup";
import { commoncontext } from "../contexts/commoncontext";
import { gamecontext } from "../contexts/gamecontext";

const Play = () => {
  const { showBoard } = useContext(gamecontext);
  const { setShowNavbar } = useContext(commoncontext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    setShowNavbar(isMobile);
  }, [isMobile, setShowNavbar]);

  return (
    <div className="bg-gray-950 min-h-screen text-white font-sans">
    <div className="absolute inset-0 opacity-5 pointer-events-none">
     <div className="absolute inset-0 bg-[length:80px_80px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]"></div>
   </div>
      {!showBoard && (
        <div className="flex justify-center relative z-10 h-full  items-center">
          <GameSetup />
        </div>
      )}
      {showBoard && <Chess />}
      
    </div>
  );
};

export default Play;
