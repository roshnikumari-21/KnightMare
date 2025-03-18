import React from 'react';
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

function boardToFEN(board, currentPlayer, halfmoveClock, fullmoveNumber) {
  let fen = '';
  for (let row = 0; row < 8; row++) {
    let emptyCount = 0;
    for (let col = 0; col < 8; col++) {
      let piece = board[row][col].piece;
      if (!piece) {
        emptyCount++;
      } else {
        if (emptyCount > 0) {
          fen += emptyCount;
          emptyCount = 0;
        }
        const symbol = pieceSymbol(piece.type, piece.color);
        fen += symbol;
      }
    }
    if (emptyCount > 0) {
      fen += emptyCount;
    }
    if (row < 7) fen += '/';
  }
  fen += ` ${currentPlayer === 'white' ? 'w' : 'b'} KQkq - ${halfmoveClock} ${fullmoveNumber}`;
  return fen;
}

function pieceSymbol(type, color) {
  let symbol = '';
  switch (type) {
    case 'king': symbol = 'k'; break;
    case 'queen': symbol = 'q'; break;
    case 'rook': symbol = 'r'; break;
    case 'bishop': symbol = 'b'; break;
    case 'knight': symbol = 'n'; break;
    case 'pawn': symbol = 'p'; break;
    default: return '';
  }
  return color === 'white' ? symbol.toUpperCase() : symbol;
}

function fenToBoard(fen) {
  const [boardStr, turn, castling, enPassant, halfmoveClock, fullmoveNumber] = fen.split(' ');
  const rows = boardStr.split('/');
  const newBoard = initialBoard.map(row => row.map(square => ({ ...square, piece: null })));

  rows.forEach((row, rowIndex) => {
    let colIndex = 0;
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (isNaN(char)) {
        let color = char === char.toUpperCase() ? 'white' : 'black';
        let type;
        switch (char.toLowerCase()) {
          case 'k': type = 'king'; break;
          case 'q': type = 'queen'; break;
          case 'r': type = 'rook'; break;
          case 'b': type = 'bishop'; break;
          case 'n': type = 'knight'; break;
          case 'p': type = 'pawn'; break;
          default: colIndex++; continue;
        }
        newBoard[rowIndex][colIndex].piece = { type: type, color: color };
        colIndex++;
      } else {
        colIndex += parseInt(char);
      }
    }
  });

  return newBoard;
}

const ChessBoard = ({ board, handleSquareClick }) => {
  // Function to play the capture sound
  const playCaptureSound = () => {
    const audio = new Audio(captureSound); // Create an audio object
    audio.play().catch((error) => console.error("Failed to play sound:", error)); // Play the sound
  };

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

  // Handle square click with sound
  const handleClickWithSound = (square) => {
    handleSquareClick(square); // Call the original click handler
    playCaptureSound(); // Play the sound
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative">
        <div className="grid grid-cols-8 w-[90vmin] h-[90vmin] border-2 border-gray-800 rounded-lg overflow-hidden shadow-2xl">
          {board.flat().map((square) => (
            <div
              key={`${square.row}-${square.col}`}
              onClick={() => handleClickWithSound(square)} // Use the new click handler
              className={`
                relative group
                ${square.isLight ? 'bg-red-900' : 'bg-gray-900'}
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

export { initialBoard, boardToFEN, fenToBoard };
export default ChessBoard;