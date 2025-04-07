export const checkThreefoldRepetition = (moveHistory) => {
    if (!moveHistory || moveHistory.length === 0) return false;
  
    const positionCounts = {};
    
  
    for (const move of moveHistory) {
     
      const fen = move?.fen?.split(' ')[0] || move?.position; 
      if (!fen) continue;
      
      positionCounts[fen] = (positionCounts[fen] || 0) + 1;
      if (positionCounts[fen] >= 3) return true;
    }
  
    return false;
  };