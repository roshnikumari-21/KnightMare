import  FindKing from "./creepyfunctions/FindKing";
import GetAttackedSquares from "./creepyfunctions/GetAttackedSquare";
// move validation 
export function validateMove(board, start, end, currentPlayer, castlingRights, enPassantTarget) {
    // Reuse the logic from ShowLegalMoves
    const legalMoves = ShowLegalMoves(
        board,
        start.piece,
        { row: start.row, col: start.col },
        castlingRights,
        enPassantTarget,
        currentPlayer
    );
    
    return legalMoves.some(move => 
        move.row === end.row && move.col === end.col
    );
}

//show legal moves

export function ShowLegalMoves(
    board, 
    selectedPiece, 
    piece_square, 
    castlingRights, 
    enPassantTarget = null, 
    checkForChecks = true
) {
    const legal_moves = [];
    const {type: piece_name, color: piece_color, hasMoved} = selectedPiece;
    const {row: x, col: y} = piece_square;
    const dir = piece_color === "white" ? -1 : 1;
    const enemyColor = piece_color === "white" ? "black" : "white";

    // Helper functions
    const isOnBoard = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;
    const isEmpty = (row, col) => isOnBoard(row, col) && !board[row][col].piece;
    const isEnemy = (row, col) => isOnBoard(row, col) && board[row][col].piece?.color === enemyColor;
    const isAlly = (row, col) => isOnBoard(row, col) && board[row][col].piece?.color === piece_color;

    // Get enemy attacked squares if checking for checks
    const enemyAttackedSquares = checkForChecks ? GetAttackedSquares(board, enemyColor) : [];

    // Check if square is safe (not attacked by enemy)
    const isSquareSafe = (row, col) => !enemyAttackedSquares.some(s => s.row === row && s.col === col);

    // Check if path is clear between two squares (excluding start/end)
    const isPathClear = (startRow, startCol, endRow, endCol) => {
        const dx = Math.sign(endRow - startRow);
        const dy = Math.sign(endCol - startCol);
        let currRow = startRow + dx;
        let currCol = startCol + dy;
        
        while (currRow !== endRow || currCol !== endCol) {
            if (!isEmpty(currRow, currCol)) return false;
            currRow += dx;
            currCol += dy;
        }
        return true;
    };

    // Check if piece is pinned
    const isPinned = () => {
        if (!checkForChecks) return false;
        
        const kingPos = FindKing(board, piece_color);
        if (!kingPos) return false;
        
        // Temporarily remove the piece
        const tempPiece = board[x][y].piece;
        board[x][y].piece = null;
        
        // Check if king is in check without this piece
        const tempAttacked = GetAttackedSquares(board, enemyColor);
        const isKingAttacked = tempAttacked.some(
            s => s.row === kingPos.row && s.col === kingPos.col
        );
        
        // Restore the piece
        board[x][y].piece = tempPiece;
        
        return isKingAttacked;
    };

    // Generate moves for each piece type
    switch(piece_name) {
        case "pawn":
            // Single move forward
            if (isEmpty(x + dir, y)) {
                addMoveIfLegal(x + dir, y);
                
                // Double move from starting position
                const startRow = piece_color === "white" ? 6 : 1;
                if (x === startRow && isEmpty(x + 2*dir, y) && isEmpty(x + dir, y)) {
                    addMoveIfLegal(x + 2*dir, y);
                }
            }
            
            // Capture moves
            const captureDirections = [[dir, -1], [dir, 1]];
            for (const [dx, dy] of captureDirections) {
                const newX = x + dx;
                const newY = y + dy;
                
                // Normal capture
                if (isEnemy(newX, newY)) {
                    addMoveIfLegal(newX, newY);
                }
                
                // En passant
                if (enPassantTarget && newX === enPassantTarget.row && newY === enPassantTarget.col) {
                    if ((piece_color === "white" && x === 3) || (piece_color === "black" && x === 4)) {
                        addMoveIfLegal(newX, newY, {isEnPassant: true});
                    }
                }
            }
            break;

        case "knight":
            const knightMoves = [
                [2, 1], [2, -1], [-2, 1], [-2, -1],
                [1, 2], [1, -2], [-1, 2], [-1, -2]
            ];
            for (const [dx, dy] of knightMoves) {
                const newX = x + dx;
                const newY = y + dy;
                if (isOnBoard(newX, newY)) {
                    if (!isAlly(newX, newY)) {
                        addMoveIfLegal(newX, newY);
                    }
                }
            }
            break;

        case "bishop":
            const bishopDirections = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
            slideMoves(bishopDirections);
            break;

        case "rook":
            const rookDirections = [[1, 0], [-1, 0], [0, 1], [0, -1]];
            slideMoves(rookDirections);
            break;

        case "queen":
            const queenDirections = [
                [1, 0], [-1, 0], [0, 1], [0, -1],
                [1, 1], [1, -1], [-1, 1], [-1, -1]
            ];
            slideMoves(queenDirections);
            break;

            case "king":
    // Normal king moves
    const kingMoves = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];
    
    // Get all squares attacked by enemy
    const enemyAttacks = GetAttackedSquares(board, enemyColor);
    
    for (const [dx, dy] of kingMoves) {
        const newX = x + dx;
        const newY = y + dy;
        
        if (isOnBoard(newX, newY)) {
            // Check if square is under attack
            const isSquareAttacked = enemyAttacks.some(sq => 
                sq.row === newX && sq.col === newY
            );
            
            // Only allow move if square is not under attack and not occupied by ally
            if (!isAlly(newX, newY) && !isSquareAttacked) {
                legal_moves.push({row: newX, col: newY});
            }
        }
    }
    
    // Castling - only if not in check
    if (checkForChecks && !hasMoved && !enemyAttacks.some(sq => sq.row === x && sq.col === y)) {
        const castleSide = {
            'K': {rookCol: 7, newKingCol: 6, squaresBetween: [5, 6]},
            'Q': {rookCol: 0, newKingCol: 2, squaresBetween: [1, 2, 3]}
        };

        for (const [side, data] of Object.entries(castleSide)) {
            if (castlingRights[piece_color][side]) {
                const rookSquare = board[x][data.rookCol];
                
                if (rookSquare.piece?.type === 'rook' && !rookSquare.piece.hasMoved) {
                    // Check path is clear and safe
                    const pathClear = isPathClear(y, data.rookCol);
                    const pathSafe = data.squaresBetween.every(col => 
                        isEmpty(x, col) && 
                        !enemyAttacks.some(sq => sq.row === x && sq.col === col)
                    );
                    
                    if (pathClear && pathSafe) {
                        addMoveIfLegal(x, data.newKingCol, {
                            isCastle: true,
                            rookFrom: {row: x, col: data.rookCol},
                            rookTo: {row: x, col: side === 'K' ? 5 : 3}
                        });
                    }
                }
            }
        }
    }
    break;
    }

    return legal_moves;

    // Helper function for sliding pieces
    function slideMoves(directions) {
        for (const [dx, dy] of directions) {
            let newX = x + dx;
            let newY = y + dy;
            while (isOnBoard(newX, newY)) {
                if (isEmpty(newX, newY)) {
                    addMoveIfLegal(newX, newY);
                } else {
                    if (isEnemy(newX, newY)) {
                        addMoveIfLegal(newX, newY);
                    }
                    break;
                }
                newX += dx;
                newY += dy;
            }
        }
    }

    // Add move if it doesn't leave king in check
    function addMoveIfLegal(row, col, specialMove = null) {
        if (!checkForChecks || !isPinned()) {
            legal_moves.push({row, col, ...specialMove});
            return;
        }

        // For pinned pieces, only allow moves that maintain the pin
        const tempBoard = JSON.parse(JSON.stringify(board));
        tempBoard[row][col].piece = tempBoard[x][y].piece;
        tempBoard[x][y].piece = null;
        
        const kingPos = FindKing(tempBoard, piece_color);
        if (kingPos) {
            const stillAttacked = GetAttackedSquares(tempBoard, enemyColor)
                .some(s => s.row === kingPos.row && s.col === kingPos.col);
            
            if (!stillAttacked) {
                legal_moves.push({row, col, ...specialMove});
            }
        }
    }
}

// Function to check for checkmate/stalemate
export function checkGameState(board, color, castlingRights, enPassantTarget) {
    const enemyColor = color === 'white' ? 'black' : 'white';
    const kingPos = FindKing(board, color);
    if (!kingPos) return 'checkmate'; // Shouldn't happen
    
    const attackedSquares = GetAttackedSquares(board, enemyColor);
    const isInCheck = attackedSquares.some(s => 
        s.row === kingPos.row && s.col === kingPos.col
    );
    
    // Check if any legal moves exist
    let hasLegalMoves = false;
    outerLoop:
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            const piece = board[x][y].piece;
            if (piece && piece.color === color) {
                const moves = ShowLegalMoves(
                    board, 
                    piece, 
                    {row: x, col: y}, 
                    castlingRights, 
                    enPassantTarget
                );
                if (moves.length > 0) {
                    hasLegalMoves = true;
                    break outerLoop;
                }
            }
        }
    }
    
    if (isInCheck) {
        return hasLegalMoves ? 'check' : 'checkmate';
    } else {
        return hasLegalMoves ? 'normal' : 'stalemate';
    }
}