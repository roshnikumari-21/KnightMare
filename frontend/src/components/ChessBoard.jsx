import React, { useState, useCallback, useEffect } from 'react';
import { FaChessKing, FaChessQueen, FaChessRook, FaChessBishop, FaChessKnight, FaChessPawn } from 'react-icons/fa';
import "./chessboard.css";

const initialBoard = Array(8).fill().map((_, row) =>
  Array(8).fill().map((_, col) => {
    const isLight = (row + col) % 2 === 0;
    let piece = null;
    const color = row < 2 ? 'black' : row > 5 ? 'white' : null;

    // Set up pawns
    if (row === 1 || row === 6) piece = { type: 'pawn', color };
    
    // Set up other pieces
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

  const getIcon = (type, color) => {
    switch (type) {
      case 'king':
        return color === 'white' ? <FaChessKing size={60} color="white" /> : <FaChessKing size={60} color="black" />;
      case 'queen':
        return color === 'white' ? <FaChessQueen size={60} color="white" /> : <FaChessQueen size={60} color="black" />;
      case 'rook':
        return color === 'white' ? <FaChessRook size={60} color="white" /> : <FaChessRook size={60} color="black" />;
      case 'bishop':
        return color === 'white' ? <FaChessBishop size={60} color="white" /> : <FaChessBishop size={60} color="black" />;
      case 'knight':
        return color === 'white' ? <FaChessKnight size={60} color="white" /> : <FaChessKnight size={60} color="black" />;
      case 'pawn':
        return color === 'white' ? <FaChessPawn size={60} color="white" /> : <FaChessPawn size={60} color="black" />;
      default:
        return null;
    }
  };

  const validateMove = useCallback((start, end) => {
    if (!start.piece) return false;
    if (start.piece.color !== currentPlayer) return false;
    if (end.piece?.color === currentPlayer) return false;

    const dx = Math.abs(end.col - start.col);
    const dy = Math.abs(end.row - start.row);
    const direction = start.piece.color === 'white' ? -1 : 1;

    // Common validation helper
    const isPathClear = (startPos, endPos, isDiagonal = false) => {
      const stepX = Math.sign(endPos.col - startPos.col);
      const stepY = Math.sign(endPos.row - startPos.row);
      let currentX = startPos.col + stepX;
      let currentY = startPos.row + stepY;

      while (currentX !== endPos.col || currentY !== endPos.row) {
        if (board[currentY][currentX].piece) return false;
        currentX += stepX;
        currentY += stepY;
        if (isDiagonal && currentX !== endPos.col) break;
      }
      return true;
    };

    switch (start.piece.type) {
      case 'pawn':
        // Regular move
        if (dx === 0 && end.row === start.row + direction && !end.piece) return true;
        // Initial two-square move
        if (dx === 0 && ((start.row === 1 && direction === 1) || (start.row === 6 && direction === -1)) && 
            end.row === start.row + 2 * direction && !end.piece && isPathClear(start, end)) return true;
        // Capture
        if (dx === 1 && dy === 1 && end.piece) return true;
        break;

      case 'knight':
        return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);

      case 'bishop':
        return dx === dy && isPathClear(start, end, true);

      case 'rook':
        return (dx === 0 || dy === 0) && isPathClear(start, end);

      case 'queen':
        return (dx === dy || dx === 0 || dy === 0) && isPathClear(start, end);

      case 'king':
        return dx <= 1 && dy <= 1;

      default:
        return false;
    }
    return false;
  }, [currentPlayer, board]);

  const handleSquareClick = useCallback((clickedSquare) => {
    const newBoard = board.map(row => 
      row.map(square => ({ 
        ...square, 
        isSelected: false, 
        isLegalMove: false 
      }))
    );

    if (!selectedSquare) {
      if (clickedSquare.piece?.color === currentPlayer) {
        // Show legal moves
        newBoard.forEach(row => row.forEach(square => {
          square.isLegalMove = validateMove(clickedSquare, square);
        }));
        newBoard[clickedSquare.row][clickedSquare.col].isSelected = true;
        setSelectedSquare(clickedSquare);
      }
    } else {
      if (validateMove(selectedSquare, clickedSquare)) {
        // Move piece
        newBoard[clickedSquare.row][clickedSquare.col].piece = selectedSquare.piece;
        newBoard[selectedSquare.row][selectedSquare.col].piece = null;
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
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
              className={`
                relative group
                ${square.isLight ? 'bg-gray-700' : 'bg-gray-900'}
                ${square.isSelected ? '!bg-blue-400/50' : ''}
                ${square.isLegalMove ? '!bg-green-400/40' : ''}
                transition-all duration-200
                hover:brightness-125
                flex items-center justify-center
              `}
            >
              {square.piece && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {getIcon(square.piece.type, square.piece.color)}
                </div>
              )}

              {/* Coordinates */}
              {(square.row === 7 && square.col === 0) && (
                <div className="absolute top-0 left-0 text-xs font-bold text-gray-600">
                  a
                </div>
              )}
              {(square.row === 7 && square.col === 7) && (
                <div className="absolute top-0 right-0 text-xs font-bold text-gray-600">
                  h
                </div>
              )}
              {(square.row === 7 && square.col > 0 && square.col < 7) && (
                <div className="absolute top-0 text-center w-full text-xs font-bold text-gray-600">
                  {String.fromCharCode(97 + square.col)}
                </div>
              )}
              {(square.col === 0 && square.row > 0 && square.row < 7) && (
                <div className="absolute left-0 text-center h-full flex items-center text-xs font-bold text-gray-600">
                  {8 - square.row}
                </div>
              )}
              {(square.col === 0 && square.row === 0) && (
                <div className="absolute top-0 left-0 text-xs font-bold text-gray-600">
                  8
                </div>
              )}
              {(square.col === 7 && square.row === 0) && (
                <div className="absolute top-0 right-0 text-xs font-bold text-gray-600">
                  8
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
