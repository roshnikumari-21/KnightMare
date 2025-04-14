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

    const isOnBoard = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;
    const isEmpty = (row, col) => isOnBoard(row, col) && !board[row][col].piece;
    const isEnemy = (row, col) => isOnBoard(row, col) && board[row][col].piece?.color === enemyColor;
    const isAlly = (row, col) => isOnBoard(row, col) && board[row][col].piece?.color === piece_color;

    const enemyAttackedSquares = checkForChecks ? GetAttackedSquares(board, enemyColor) : [];


    const isSquareSafe = (row, col) => !enemyAttackedSquares.some(s => s.row === row && s.col === col);


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


    const isPinned = () => {
        if (!checkForChecks) return false;
        
        const kingPos = FindKing(board, piece_color);
        if (!kingPos) return false;
        
   
        const tempPiece = board[x][y].piece;
        board[x][y].piece = null;
        
       
        const tempAttacked = GetAttackedSquares(board, enemyColor);
        const isKingAttacked = tempAttacked.some(
            s => s.row === kingPos.row && s.col === kingPos.col
        );
   
        board[x][y].piece = tempPiece;
        
        return isKingAttacked;
    };

    switch(piece_name) {
        case "pawn":
       
            if (isEmpty(x + dir, y)) {
                addMoveIfLegal(x + dir, y);
                
             
                const startRow = piece_color === "white" ? 6 : 1;
                if (x === startRow && isEmpty(x + 2*dir, y) && isEmpty(x + dir, y)) {
                    addMoveIfLegal(x + 2*dir, y);
                }
            }
       
            const captureDirections = [[dir, -1], [dir, 1]];
            for (const [dx, dy] of captureDirections) {
                const newX = x + dx;
                const newY = y + dy;
                
           
                if (isEnemy(newX, newY)) {
                    addMoveIfLegal(newX, newY);
                }
                
              
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
                
                const kingMoves = [
                    [1, 0], [-1, 0], [0, 1], [0, -1],
                    [1, 1], [1, -1], [-1, 1], [-1, -1]
                ];
                
                const enemyAttacks = GetAttackedSquares(board, enemyColor);
                const kingPos = { row: x, col: y };
                
        
                const checkingPieces = [];
                const enemyPiecesAttackingKing = [];
                
        
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        const piece = board[i][j].piece;
                        if (piece && piece.color === enemyColor) {
    
                            if (piece.type === 'pawn') {
                        
                                const pawnDir = piece.color === 'white' ? -1 : 1;
                                if ((i + pawnDir === kingPos.row && Math.abs(j - kingPos.col) === 1)) {
                                    enemyPiecesAttackingKing.push({row: i, col: j, type: 'pawn'});
                                }
                            }
                            else if (piece.type === 'knight') {
    
                                const dx = Math.abs(i - kingPos.row);
                                const dy = Math.abs(j - kingPos.col);
                                if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) {
                                    enemyPiecesAttackingKing.push({row: i, col: j, type: 'knight'});
                                }
                            }
                            else {
                             
                                const dx = kingPos.row - i;
                                const dy = kingPos.col - j;
                                
                              
                                if (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)) {
                                    const stepX = Math.sign(dx);
                                    const stepY = Math.sign(dy);
                                    let xPos = i + stepX;
                                    let yPos = j + stepY;
                                    let pathClear = true;
                                 
                                    while (xPos !== kingPos.row || yPos !== kingPos.col) {
                                        if (board[xPos][yPos].piece) {
                                            pathClear = false;
                                            break;
                                        }
                                        xPos += stepX;
                                        yPos += stepY;
                                    }
                                    
                                    if (pathClear) {
                                      
                                        if ((piece.type === 'bishop' && Math.abs(dx) === Math.abs(dy)) ||
                                            (piece.type === 'rook' && (dx === 0 || dy === 0)) ||
                                            (piece.type === 'queen')) {
                                            enemyPiecesAttackingKing.push({row: i, col: j, type: piece.type});
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
                const isInCheck = enemyPiecesAttackingKing.length > 0;
                let restrictedSquares = [];
                
                if (isInCheck) {
                    enemyPiecesAttackingKing.forEach(attacker => {
                        if (attacker.type === 'knight' || attacker.type === 'pawn') {
                           
                            restrictedSquares.push({row: attacker.row, col: attacker.col});
                        } else {
                         
                            const dx = Math.sign(kingPos.row - attacker.row);
                            const dy = Math.sign(kingPos.col - attacker.col);
                            let r = attacker.row + dx;
                            let c = attacker.col + dy;
                            
                            while (r !== kingPos.row || c !== kingPos.col) {
                                restrictedSquares.push({row: r, col: c});
                                r += dx;
                                c += dy;
                            }

                            r = kingPos.row + dx;
                            c = kingPos.col + dy;
                            
                            while (isOnBoard(r, c)) {
                                restrictedSquares.push({row: r, col: c});
                                
                               
                                if (board[r][c].piece) break;
                                
                                r += dx;
                                c += dy;
                            }
                        }
                    });
                }
              
                for (const [dx, dy] of kingMoves) {
                    const newX = x + dx;
                    const newY = y + dy;
                    
                    if (isOnBoard(newX, newY) && !isAlly(newX, newY)) {
                   
                        const isSquareAttacked = enemyAttacks.some(sq => 
                            sq.row === newX && sq.col === newY
                        );
                        
                     
                        const isInLineOfAttack = isInCheck && restrictedSquares.some(sq =>
                            sq.row === newX && sq.col === newY
                        );
                        
                        if (!isSquareAttacked && !(isInCheck && isInLineOfAttack)) {
                            legal_moves.push({row: newX, col: newY});
                        }
                    }
                }
                
  
    if (checkForChecks && !hasMoved && !enemyAttacks.some(sq => sq.row === x && sq.col === y)) {
        const castleOptions = {
            'K': { 
                rookCol: 7, 
                newKingCol: 6, 
                betweenSquares: [[x,5],[x,6]],
                rookToCol: 5
            },
            'Q': { 
                rookCol: 0, 
                newKingCol: 2, 
                betweenSquares: [[x,1],[x,2],[x,3]],
                rookToCol: 3
            }
        };

      
        const colorRights = castlingRights[piece_color.toLowerCase()];
        
        for (const [side, data] of Object.entries(castleOptions)) {
            if (colorRights && colorRights[side]) {
                const rookSquare = board[x][data.rookCol];
                
            
                if (rookSquare.piece?.type === 'rook' && 
                    rookSquare.piece?.color === piece_color && 
                    !rookSquare.piece.hasMoved) {
                    
                   
                    const pathClear = data.betweenSquares.every(
                        ([r, c]) => isEmpty(r, c)
                    );
                    const pathSafe = data.betweenSquares.every(
                        ([r, c]) => !enemyAttacks.some(sq => sq.row === r && sq.col === c)
                    );
                    
                    if (pathClear && pathSafe) {
                        legal_moves.push({
                            row: x,
                            col: data.newKingCol,
                            isCastle: true,
                            castleSide: side,
                            rookFromCol: data.rookCol,
                            rookToCol: data.rookToCol
                        });
                    }
                }
            }
        }
    }
    break;
    }

    return legal_moves;

    
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

 
    function addMoveIfLegal(row, col, specialMove = null) {
        if (!checkForChecks || !isPinned()) {
            legal_moves.push({row, col, ...specialMove});
            return;
        }

      
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


export function checkGameState(board, color, castlingRights, enPassantTarget) {
    const enemyColor = color === 'white' ? 'black' : 'white';
    const kingPos = FindKing(board, color);
    if (!kingPos) return 'checkmate'; 
    
    const attackedSquares = GetAttackedSquares(board, enemyColor);
    const isInCheck = attackedSquares.some(s => 
        s.row === kingPos.row && s.col === kingPos.col
    );
    
   
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