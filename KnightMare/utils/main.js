let board = [
    ["B:R", "B:N", "B:B", "B:Q", "B:K", "B:B", "B:N", "B:R"],
    ["B:P", "B:P", "B:P", "B:P", "B:P", "B:P", "B:P", "B:P"],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    ["W:P", "W:P", "W:P", "W:P", "W:P", "W:P", "W:P", "W:P"],
    ["W:R", "W:N", "W:B", "W:Q", "W:K", "W:B", "W:N", "W:R"]
];

const canMove = {
    "R": [[1, 0], [-1, 0], [0, 1], [0, -1]], // Straight lines
    "N": [[-2, 1], [-2, -1], [-1, 2], [-1, -2], [1, 2], [1, -2], [2, 1], [2, -1]], // Knight jumps
    "B": [[1, 1], [-1, -1], [1, -1], [-1, 1]], // Diagonals
    "Q": [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]], // Rook + Bishop
    "K": [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]], // One step in any direction
};

deadPieces = {
    white: [],
    black: []
}

function nextPossibleMoves(pos, board) {
    let piece = board[pos[0]][pos[1]];
    if (!piece) return { possibleMoves: [], possibleDeadPos: [] };

    let [color, type] = piece.split(":");
    let possibleMoves = [];
    let possibleDeadPos = [];

    // Pawn Movement Logic
    if (type === "P") {
        let direction = color === "W" ? -1 : 1;

        let forwardX = pos[0] + direction;
        if (forwardX >= 0 && forwardX < 8) {
            if (board[forwardX][pos[1]] === 0) possibleMoves.push([forwardX, pos[1]]);
            if (pos[1] - 1 >= 0 && board[forwardX][pos[1] - 1] && board[forwardX][pos[1] - 1].split(":")[0] !== color) {
                possibleDeadPos.push([forwardX, pos[1] - 1]);
            }
            if (pos[1] + 1 < 8 && board[forwardX][pos[1] + 1] && board[forwardX][pos[1] + 1].split(":")[0] !== color) {
                possibleDeadPos.push([forwardX, pos[1] + 1]);
            }
        }
        return { possibleMoves, possibleDeadPos };
    }

    // Knight Movement
    if (type === "N") {
        for (let move of canMove["N"]) {
            let x = pos[0] + move[0];
            let y = pos[1] + move[1];
            if (x >= 0 && x < 8 && y >= 0 && y < 8) {
                if (board[x][y] === 0) possibleMoves.push([x, y]);
                else if (board[x][y].split(":")[0] !== color) possibleDeadPos.push([x, y]);
            }
        }
        return { possibleMoves, possibleDeadPos };
    }

    // Sliding Pieces: Rook, Bishop, Queen
    let directions = canMove[type];
    for (let [dx, dy] of directions) {
        let x = pos[0] + dx;
        let y = pos[1] + dy;
        while (x >= 0 && x < 8 && y >= 0 && y < 8) {
            if (board[x][y] === 0) {
                possibleMoves.push([x, y]);
            } else {
                if (board[x][y].split(":")[0] !== color) {
                    possibleDeadPos.push([x, y]);
                }
                break;
            }
            x += dx;
            y += dy;
        }
    }

    // King Movement
    if (type === "K") {
        for (let [dx, dy] of canMove["K"]) {
            let x = pos[0] + dx;
            let y = pos[1] + dy;
            if (x >= 0 && x < 8 && y >= 0 && y < 8) {
                if (board[x][y] === 0) possibleMoves.push([x, y]);
                else if (board[x][y].split(":")[0] !== color) possibleDeadPos.push([x, y]);
            }
        }
    }

    return { possibleMoves, possibleDeadPos };
}

function movePiece(board, currentPos, nextPos) { 
    let piece = board[currentPos[0]][currentPos[1]];
    if (!piece) return false;

    let [color, type] = piece.split(":");
    let targetPiece = board[nextPos[0]][nextPos[1]];

    if (targetPiece && targetPiece.split(":")[0] !== color) {
        deadPieces[color === "W" ? "black" : "white"].push(targetPiece);
    }

    board[nextPos[0]][nextPos[1]] = piece;
    board[currentPos[0]][currentPos[1]] = 0;

    return true;
}

console.log(nextPossibleMoves([7, 0], board));
console.log(nextPossibleMoves([1, 4], board));
console.log(nextPossibleMoves([0, 1], board));
