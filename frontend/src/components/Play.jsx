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
    <div
      className="  bg-gray-900"
      // style={{ backgroundImage: "url('/chessfloor2.jpg')" }}
    >
      {!showBoard && (
        <div className="flex justify-center h-full  items-center">
          <GameSetup />
        </div>
      )}
      {showBoard && <Chess />}
    </div>
  );
};

export default Play;
