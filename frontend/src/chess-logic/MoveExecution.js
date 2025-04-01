
import { pieceSymbol } from "./BoardUtils";



export function makeMove(board, from, to, castlingRights, setCastlingRights, setEnPassantTarget) {
    const newBoard = board.map(row => row.map(sq => ({...sq})));
    const piece = newBoard[from.row][from.col].piece;
    
    // Handle castling
    if (piece.type === 'king' && Math.abs(from.col - to.col) === 2) {
        const isKingside = to.col > from.col;
        const rookFromCol = isKingside ? 7 : 0;
        const rookToCol = isKingside ? 5 : 3;
        
        newBoard[to.row][rookToCol].piece = newBoard[from.row][rookFromCol].piece;
        newBoard[from.row][rookFromCol].piece = null;
    }
  
    // Handle en passant capture
    if (piece.type === 'pawn' && from.col !== to.col && !newBoard[to.row][to.col].piece) {
        newBoard[from.row][to.col].piece = null;
    }
  
    // Update piece position
    newBoard[to.row][to.col].piece = piece;
    newBoard[from.row][from.col].piece = null;
  
    // Update castling rights if needed
    if (piece.type === 'king' || piece.type === 'rook') {
        updateCastlingRights(piece, from, castlingRights, setCastlingRights);
    }
  
    // Handle pawn special cases
    if (piece.type === 'pawn') {
        if (Math.abs(from.row - to.row) === 2) {
            setEnPassantTarget({ col: from.col, row: (from.row + to.row) / 2 });
        } else {
            setEnPassantTarget(null);
        }
    }
  
    return newBoard;
}

export function updateCastlingRights(piece, start, castlingRights, setCastlingRights) {
    setCastlingRights(prev => {
        const newRights = {...prev};
        const color = piece.color;
        
        if (piece.type === 'king') {
            newRights[color].K = false;
            newRights[color].Q = false;
        } else if (piece.type === 'rook') {
            if (start.col === 0) newRights[color].Q = false;
            if (start.col === 7) newRights[color].K = false;
        }
        
        return newRights;
    });
}


export function boardToFEN(board, currentPlayer, halfmoveClock, fullmoveNumber) {
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


export function fenToBoard(fen) {
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
