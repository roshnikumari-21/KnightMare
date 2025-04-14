//conventions , [x,y] = position , x represents row-no , y-represents col-no
//0,0 is at the top of the board 
//lowercase represents black pieces.


function isLowercase(piece) {
    return piece >= 'a' && piece <= 'z';
}
function rookMoves(board, pos) {
    const [x, y] = pos;
    const possibleMoves = [];
    const cutpieces = [];
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const isBlack = isLowercase(board[x][y]);

    for (const [dx, dy] of directions) {
        let i = x + dx, j = y + dy;
        while (i >= 0 && i < 8 && j >= 0 && j < 8) {
            if (board[i][j] === "0") {
                possibleMoves.push([i, j]);
            } else {
                if (isLowercase(board[i][j]) !== isBlack) {
                    cutpieces.push([i, j]);
                }
                break;
            }
            i += dx;
            j += dy;
        }
    }
    return [possibleMoves, cutpieces];
}

function knightMoves(board, pos) {
    const [x, y] = pos;
    const possibleMoves = [];
    const cutpieces = [];
    const directions = [[1, 2], [2, 1], [-1, 2], [2, -1], [-1, -2], [-2, -1], [1, -2], [-2, 1]];
    const isBlack = isLowercase(board[x][y]);

    for (const [dx, dy] of directions) {
        let i = x + dx, j = y + dy;
        if (i >= 0 && i < 8 && j >= 0 && j < 8) {
            if (board[i][j] === "0") {
                possibleMoves.push([i, j]);
            } else if (isLowercase(board[i][j]) !== isBlack) {
                cutpieces.push([i, j]);
            }
        }
    }
    return [possibleMoves, cutpieces];
}

function bishopMoves(board, pos) {
    const [x, y] = pos;
    const possibleMoves = [];
    const cutpieces = [];
    const directions = [[1, 1], [-1, -1], [1, -1], [-1, 1]];
    const isBlack = isLowercase(board[x][y]);

    for (const [dx, dy] of directions) {
        let i = x + dx, j = y + dy;
        while (i >= 0 && i < 8 && j >= 0 && j < 8) {
            if (board[i][j] === "0") {
                possibleMoves.push([i, j]);
            } else {
                if (isLowercase(board[i][j]) !== isBlack) {
                    cutpieces.push([i, j]);
                }
                break;
            }
            i += dx;
            j += dy;
        }
    }
    return [possibleMoves, cutpieces];
}

function queenMoves(board, pos) {
    const [x, y] = pos;
    const possibleMoves = [];
    const cutpieces = [];
    const directions = [[1, 1], [-1, -1], [1, -1], [-1, 1], [1, 0], [-1, 0], [0, 1], [0, -1]];
    const isBlack = isLowercase(board[x][y]);

    for (const [dx, dy] of directions) {
        let i = x + dx, j = y + dy;
        while (i >= 0 && i < 8 && j >= 0 && j < 8) {
            if (board[i][j] === "0") {
                possibleMoves.push([i, j]);
            } else {
                if (isLowercase(board[i][j]) !== isBlack) {
                    cutpieces.push([i, j]);
                }
                break;
            }
            i += dx;
            j += dy;
        }
    }
    return [possibleMoves, cutpieces];
}

function kingMoves(board, pos) {
    const [x, y] = pos;
    const possibleMoves = [];
    const cutpieces = [];
    const directions = [[1, 1], [-1, -1], [1, -1], [-1, 1], [1, 0], [-1, 0], [0, 1], [0, -1]];
    const isBlack = isLowercase(board[x][y]);

    for (const [dx, dy] of directions) {
        let i = x + dx, j = y + dy;
        if (i >= 0 && i < 8 && j >= 0 && j < 8) {
            if (board[i][j] === "0") {
                possibleMoves.push([i, j]);
            } else if (isLowercase(board[i][j]) !== isBlack) {
                cutpieces.push([i, j]);
            }
        }
    }
    return [possibleMoves, cutpieces];
}

function pawnMoves(board, pos) {
    const [x, y] = pos;
    const possibleMoves = [];
    const cutpieces = [];

    const isBlack = isLowercase(board[x][y]);
    const direction = isBlack ? 1 : -1;
    const startRow = isBlack ? 1 : 6;

    if (x + direction >= 0 && x + direction < 8 && board[x + direction][y] === "0") {
        possibleMoves.push([x + direction, y]);
        if (x === startRow && ((x + 2*direction)>=0 && (x + 2*direction)<8) && board[x + 2 * direction][y] === "0") {
            possibleMoves.push([x + 2 * direction, y]);
        }
    }
    for (const dy of [-1, 1]) {
        const i = x + direction, j = y + dy;
        if (i >= 0 && i < 8 && j >= 0 && j < 8 && board[i][j] !== "0") {
            if (isLowercase(board[i][j]) !== isBlack) {
                cutpieces.push([i, j]);
            }
        }
    }
    return [possibleMoves, cutpieces];
}
export const nextPossibleMoves = (board,pos)=>{
    const x = pos[0];
    const y = pos[1];
   if((board[x][y] == 'r') || (board[x][y] == 'R')){
     return rookMoves(board , pos);
   }
   else if((board[x][y] == 'n') || (board[x][y] == 'N')){
    return knightMoves(board , pos);
  }
  else if((board[x][y] == 'b') || (board[x][y] == 'B')){
    return bishopMoves(board , pos);
  }
  else if((board[x][y] == 'q') || (board[x][y] == 'Q')){
    return queenMoves(board , pos);
  }
  else if((board[x][y] == 'k') || (board[x][y] == 'K')){
    return kingMoves(board , pos);
  }
  else if((board[x][y] == 'p') || (board[x][y] == 'P')){
    return pawnMoves(board , pos);
  }
} 


const board = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"]
  ];