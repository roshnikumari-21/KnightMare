const board = [
    ["R", "0", "0", "0", "K", "0", "0", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "0", "0", "0", "k", "0", "0", "r"]
  ];



const canMove = {
    "R": [[1, 0], [-1, 0], [0, 1], [0, -1]], 
    "N": [[-2, 1], [-2, -1], [-1, 2], [-1, -2], [1, 2], [1, -2], [2, 1], [2, -1]], 
    "B": [[1, 1], [-1, -1], [1, -1], [-1, 1]], 
    "Q": [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]], 
    "K": [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]], 
    "P": [[-1, 0]], 
    "p": [[1, 0]]  
};

let deadPieces = {
    white: [],
    black: []
};

function movePiece(startRow, startCol, endRow, endCol) {
    let piece = board[startRow][startCol];
    let target = board[endRow][endCol];
    
    if (piece === "0") return false; 
    
    if (target !== "0") {
        if (piece === piece.toUpperCase() && target === target.toUpperCase()) return false; 
        if (piece === piece.toLowerCase() && target === target.toLowerCase()) return false; 
        
      
        if (target.toUpperCase() === target) {
            deadPieces.white.push(target);
        } else {
            deadPieces.black.push(target);
        }
    }
    
  
    board[endRow][endCol] = piece;
    board[startRow][startCol] = "0";
    
    return true;
}
