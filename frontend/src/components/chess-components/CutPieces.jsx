import React from 'react';

const PIECE_SYMBOLS = {
  white: {
    pawn: '♙',
    knight: '♘',
    bishop: '♗',
    rook: '♖',
    queen: '♕',
    king: '♔'
  },
  black: {
    pawn: '♟',
    knight: '♞',
    bishop: '♝',
    rook: '♜',
    queen: '♛',
    king: '♚'
  }
};

const CutPieces = ({ pieces, advantage }) => {
  // Group pieces by their original color
  const groupedPieces = pieces.reduce((acc, piece) => {
    const color = piece.color; // Original piece color
    acc[color] = acc[color] || {};
    acc[color][piece.type] = (acc[color][piece.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex items-center space-x-2 ml-2">
      {/* White pieces captured */}
      {groupedPieces.white && Object.entries(groupedPieces.white).map(([type, count]) => (
        <span
          key={`white-${type}`}
          className="text-2xl font-medium text-gray-50"
          style={{
            fontFamily: "'Segoe UI Symbol', 'Arial Unicode MS', sans-serif",
            textShadow: '0 0 2px #000, 0 0 2px #000',
            lineHeight: 1
          }}
        >
          {PIECE_SYMBOLS.white[type]}
          {count > 1 && <sup className="text-xs">{count}</sup>}
        </span>
      ))}
      
      {/* Black pieces captured */}
      {groupedPieces.black && Object.entries(groupedPieces.black).map(([type, count]) => (
        <span
          key={`black-${type}`}
          className="text-2xl font-medium text-gray-900"
          style={{
            fontFamily: "'Segoe UI Symbol', 'Arial Unicode MS', sans-serif",
            textShadow: '0 0 2px #fff, 0 0 2px #fff',
            lineHeight: 1
          }}
        >
          {PIECE_SYMBOLS.black[type]}
          {count > 1 && <sup className="text-xs">{count}</sup>}
        </span>
      ))}
      
      {advantage > 0 && (
        <span className="ml-1 text-sm font-bold text-green-400">
          +{advantage}
        </span>
      )}
    </div>
  );
};

export default CutPieces;