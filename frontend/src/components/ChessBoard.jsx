import React, { useMemo } from 'react';
import { 
  FaChessKing, FaChessQueen, FaChessRook, 
  FaChessBishop, FaChessKnight, FaChessPawn 
} from 'react-icons/fa';
import "./chessboard.css";
import captureSound from "../assets/captureSound.mp3";

const ChessBoard = ({ board, handleSquareClick, legalMoves, side }) => {
  const playSound = () => {
    const audio = new Audio(captureSound);
    audio.play().catch(console.error);
  };

  const getPieceIcon = (piece) => {
    const color = piece.color === 'white' ? 'white' : 'black';
    const props = { size: "80%", color };
    
    switch(piece.type) {
      case 'king': return <FaChessKing {...props} />;
      case 'queen': return <FaChessQueen {...props} />;
      case 'rook': return <FaChessRook {...props} />;
      case 'bishop': return <FaChessBishop {...props} />;
      case 'knight': return <FaChessKnight {...props} />;
      case 'pawn': return <FaChessPawn {...props} />;
      default: return null;
    }
  };

  const adjustedLegalMoves = useMemo(() => {
    if (!legalMoves) return [];
    
    return legalMoves.map(move => {
      // If playing as black, flip the coordinates
      if (side === 'black') {
        return {
          ...move,
          row: 7 - move.row,
          col: 7 - move.col
        };
      }
      return move;
    });
  }, [legalMoves, side]);

  const handleSquareClickWithSound = (square) => {
    const isLegal = adjustedLegalMoves?.some(m => 
      m.row === square.row && m.col === square.col
    );
    if (isLegal || square.piece) playSound();
    handleSquareClick(square);
  };

  return (
    <div className="chess-board-container">
      <div className="chess-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((square, colIndex) => {
              const isLegal = adjustedLegalMoves?.some(m => 
                m.row === rowIndex && m.col === colIndex
              );
              const isCapture = isLegal && square.piece;

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleSquareClickWithSound(square)}
                  className={`
                    chess-square 
                    ${square.isLight ? 'light' : 'dark'}
                    ${square.isSelected ? 'selected' : ''}
                  `}
                >
                  {square.piece && (
                    <div className="chess-piece">
                      {getPieceIcon(square.piece)}
                    </div>
                  )}
                  
                  {isLegal && (
                    <div className={`legal-move-indicator ${
                      isCapture ? 'capture' : 'move'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChessBoard;