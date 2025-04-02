
const PIECE_VALUES = {
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
    king: 0 // King isn't actually capturable
  };
  
  // Initialize cut pieces state
  export const initCutPieces = () => ({
    white: [],
    black: []
  });
  

  export const updateCutPieces = (cutPieces, capturedPiece, capturingColor) => {
    const newCutPieces = {...cutPieces};
    newCutPieces[capturingColor].push(capturedPiece);
    return newCutPieces;
  };
  
  // Calculate material advantage
  export const calculateAdvantage = (cutPieces, playerColor) => {
    let myValue = 0;
    let opponentValue = 0;
    const opponentColor = playerColor === 'white' ? 'black' : 'white';
  
   // pieces I have captured
    cutPieces[playerColor].forEach(piece => {
      opponentValue += PIECE_VALUES[piece.type];
    });
  
    // my lost pieces 
    cutPieces[opponentColor].forEach(piece => {
      myValue += PIECE_VALUES[piece.type];
    });
  
    return opponentValue - myValue; 
  };