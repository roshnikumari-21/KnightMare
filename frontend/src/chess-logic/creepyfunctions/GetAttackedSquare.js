function GetAttackedSquares(board, color) {
    const attackedSquares = [];
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            const square = board[x][y];
            if (square.piece && square.piece.color === color) {
                // Get raw moves without checking checks (to avoid recursion)
                const moves = GetRawMoves(board, square.piece, {row: x, col: y});
                attackedSquares.push(...moves.map(move => ({row: move.row, col: move.col})));
            }
        }
    }
    return attackedSquares;
}

function GetRawMoves(board, piece, position) {
    const {type, color} = piece;
    const {row: x, col: y} = position;
    const moves = [];
    const isOnBoard = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;
    const isEmpty = (row, col) => isOnBoard(row, col) && !board[row][col].piece;
    const isEnemy = (row, col) => isOnBoard(row, col) && board[row][col].piece?.color !== color;

    // Helper function for sliding pieces
    const addSlidingMoves = (directions) => {
        directions.forEach(([dx, dy]) => {
            let newX = x + dx;
            let newY = y + dy;
            while (isOnBoard(newX, newY)) {
                moves.push({row: newX, col: newY});
                if (!isEmpty(newX, newY)) break; // Stop if we hit a piece
                newX += dx;
                newY += dy;
            }
        });
    };

    switch(type) {
        case 'pawn':
            const dir = color === 'white' ? -1 : 1;
            // Pawn captures
            [[dir, -1], [dir, 1]].forEach(([dx, dy]) => {
                const newX = x + dx;
                const newY = y + dy;
                if (isOnBoard(newX, newY)) {
                    moves.push({row: newX, col: newY});
                }
            });
            break;

        case 'knight':
            [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]].forEach(([dx, dy]) => {
                const newX = x + dx;
                const newY = y + dy;
                if (isOnBoard(newX, newY)) {
                    moves.push({row: newX, col: newY});
                }
            });
            break;

        case 'bishop':
            addSlidingMoves([[1,1],[1,-1],[-1,1],[-1,-1]]);
            break;

        case 'rook':
            addSlidingMoves([[1,0],[-1,0],[0,1],[0,-1]]);
            break;

        case 'queen':
            addSlidingMoves([
                [1,0],[-1,0],[0,1],[0,-1],  // Rook moves
                [1,1],[1,-1],[-1,1],[-1,-1]  // Bishop moves
            ]);
            break;

        case 'king':
            // Normal king moves (castling handled separately)
            [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dx, dy]) => {
                const newX = x + dx;
                const newY = y + dy;
                if (isOnBoard(newX, newY)) {
                    moves.push({row: newX, col: newY});
                }
            });
            break;
    }

    return moves;
}

export default GetAttackedSquares;