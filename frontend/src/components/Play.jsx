import React, { useContext, useState } from 'react';
import Chess from "./Chess";
import GameSetup from "./GameSetup";
import { commoncontext } from '../contexts/commoncontext';
import { gamecontext } from '../contexts/gamecontext';

//no backend interaction needed here

const Play = () => {
   const {showBoard} = useContext(gamecontext);
   const {setShowNavbar } = useContext(commoncontext);
   setShowNavbar(false);
    return (
        <div  className="heii2 bg-cover bg-center overflow-hidden"  style={{ backgroundImage: "url('/chessfloor2.jpg')" }}>
            {!showBoard && (
                <div className="flex justify-center items-center  ">
                    <GameSetup/>
                </div>
            )}
            {showBoard && (
                <Chess/>
            )}
        </div>
    );
};

export default Play;