

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { FaChessKing, FaChessQueen, FaChessRook, FaChessBishop, FaChessKnight, FaChessPawn } from 'react-icons/fa';
import "./chessboard.css";
import chessmove from "../assets/capture.mp3";
import invalid from "../assets/notify.mp3";

const initialBoard = Array(8).fill().map((_, row) =>
  Array(8).fill().map((_, col) => {
    const isLight = (row + col) % 2 === 0;
    let piece = null;
    const color = row < 2 ? 'black' : row > 5 ? 'white' : null;

    if (row === 1 || row === 6) piece = { type: 'pawn', color };
    if (row === 0 || row === 7) {
      const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
      piece = { type: pieces[col], color };
    }

    return {
      row,
      col,
      piece,
      isLight,
      isSelected: false,
      isLegalMove: false
    };
  })
);

const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [selectedSquare, setSelectedSquare] = useState(null);

  const moveSound = useRef(new Audio(chessmove));
  const invalidSound = useRef(new Audio(invalid));

  const getIcon = (type, color) => {
    switch (type) {
      case 'king': return <FaChessKing size={60} color={color} />;
      case 'queen': return <FaChessQueen size={60} color={color} />;
      case 'rook': return <FaChessRook size={60} color={color} />;
      case 'bishop': return <FaChessBishop size={60} color={color} />;
      case 'knight': return <FaChessKnight size={60} color={color} />;
      case 'pawn': return <FaChessPawn size={60} color={color} />;
      default: return null;
    }
  };

  const validateMove = useCallback((start, end) => {
    if (!start.piece || start.piece.color !== currentPlayer) return false;
    if (end.piece?.color === currentPlayer) return false;
    
    const dx = Math.abs(end.col - start.col);
    const dy = Math.abs(end.row - start.row);
    const direction = start.piece.color === 'white' ? -1 : 1;

    switch (start.piece.type) {
      case 'pawn':
        if (dx === 0 && end.row === start.row + direction && !end.piece) return true;
        if (dx === 0 && ((start.row === 1 && direction === 1) || (start.row === 6 && direction === -1)) &&
            end.row === start.row + 2 * direction && !end.piece) return true;
        if (dx === 1 && dy === 1 && end.piece) return true;
        break;
      case 'knight': return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
      case 'bishop': return dx === dy;
      case 'rook': return dx === 0 || dy === 0;
      case 'queen': return dx === dy || dx === 0 || dy === 0;
      case 'king': return dx <= 1 && dy <= 1;
      default: return false;
    }
    return false;
  }, [currentPlayer]);

  const handleSquareClick = useCallback((clickedSquare) => {
    const newBoard = board.map(row => row.map(square => ({ ...square, isSelected: false, isLegalMove: false })));

    if (!selectedSquare) {
      if (clickedSquare.piece?.color === currentPlayer) {
        newBoard.forEach(row => row.forEach(square => {
          square.isLegalMove = validateMove(clickedSquare, square);
        }));
        newBoard[clickedSquare.row][clickedSquare.col].isSelected = true;
        setSelectedSquare(clickedSquare);
      }
    } else {
      if (validateMove(selectedSquare, clickedSquare)) {
        newBoard[clickedSquare.row][clickedSquare.col].piece = selectedSquare.piece;
        newBoard[selectedSquare.row][selectedSquare.col].piece = null;
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
        moveSound.current.play();
      } else {
        invalidSound.current.play();
      }
      setSelectedSquare(null);
    }
    setBoard(newBoard);
  }, [selectedSquare, currentPlayer, board, validateMove]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative">
        <div className="absolute -top-12 left-0 right-0 text-center">
          <div className="inline-block bg-gray-800 text-gray-200 px-4 py-2 rounded-lg shadow-xl">
            {currentPlayer}'s turn
          </div>
        </div>

        <div className="grid grid-cols-8 w-[90vmin] h-[90vmin] border-2 border-gray-800 rounded-lg overflow-hidden shadow-2xl">
          {board.flat().map((square) => (
            <div
              key={`${square.row}-${square.col}`}
              onClick={() => handleSquareClick(square)}
              className={`relative group ${square.isLight ? 'bg-gray-700' : 'bg-gray-900'} 
                ${square.isSelected ? '!bg-blue-400/50' : ''} 
                ${square.isLegalMove ? '!bg-green-400/40' : ''} 
                transition-all duration-200 hover:brightness-125 flex items-center justify-center`}
            >
              {square.piece && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {getIcon(square.piece.type, square.piece.color)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
