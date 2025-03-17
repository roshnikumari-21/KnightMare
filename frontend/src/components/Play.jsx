import React, { useState } from 'react';
import ChessBoard from "./ChessBoard";
const Play = () => {
    const [showBoard, setShowBoard] = useState(false);
    const loadChessBoard = () => {
        setShowBoard(true);
    }
    return (
        <div>
            <button 
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={loadChessBoard}
            >
                Play
            </button>
            {showBoard && <ChessBoard />}
        </div>
    )
}
export default Play;
