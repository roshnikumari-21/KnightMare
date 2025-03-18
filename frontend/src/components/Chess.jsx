import React, { useState, useCallback, useEffect, useMemo } from 'react';
// chessboard display
import ChessBoard, { initialBoard, boardToFEN } from "./ChessBoard";
// timer display
import Timer from './Timer';
// resign button
import ResignButton from './ResignButton';
// move history chart 
import MoveHistory from './MoveHistory';
// start new game button
import StartNewGame from './StartNewGame';
// stockfish integration
import { useStockfish } from '../stockfish/UseStockfish';
import captureSound from "../assets/capture.mp3"
import notifySound from "../assets/notify.mp3"


function Chess({ level, timeFormat, side }) {
  // Game state
  const [username, setUsername] = useState(''); 
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [gameOver, setGameOver] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [moves, setMoves] = useState([]);
  const [enPassantTarget, setEnPassantTarget] = useState(null);
  const [castlingRights, setCastlingRights] = useState({     white: { K: true, Q: true },
    black: { K: true, Q: true }
 });

  // Timer state
  const [gameStarted, setGameStarted] = useState(false);
const [isUserTurn, setIsUserTurn] = useState(false);

  const [whiteTime, setWhiteTime] = useState(timeFormat);
  const [blackTime, setBlackTime] = useState(timeFormat);
  const [isWhiteTimerActive, setIsWhiteTimerActive] = useState(false);


  const playCaptureSound = () => {
    const audio = new Audio(captureSound); // Create an audio object
    audio.play().catch((error) => console.error("Failed to play sound:", error)); // Play the sound
  };

  const playNotifySound = () => {
    const audio = new Audio(notifySound); // Create an audio object
    audio.play().catch((error) => console.error("Failed to play sound:", error)); // Play the sound
  };
  
  useEffect(() => {
    setIsUserTurn(side === currentPlayer);
  }, [currentPlayer, side]);
  useEffect(() => {
    // Start timer after both players have moved once
    setGameStarted(moves.length >= 1);
  }, [moves]);
  
  // Stockfish integration
  const { getBestMove } = useStockfish(level);

  // Derived state
  const flippedBoard = useMemo(() => 
    side === 'black' ? [...board].reverse().map(row => [...row].reverse()) : board,
    [board, side]
  );
  useEffect(() => {
    // Only active timer for human player's turn
    setIsWhiteTimerActive(
      (side === 'white' && currentPlayer === 'white') ||
      (side === 'black' && currentPlayer === 'black')
    );
  }, [currentPlayer, side]);
  // Timer control
  useEffect(() => {
    if (gameOver || !gameStarted) return;
  
    const interval = setInterval(() => {
      // Handle time deduction only for human player's turn
      if (isUserTurn) {
        if (side === 'white') {
          setWhiteTime(prev => Math.max(0, prev - 1));
        } else {
          setBlackTime(prev => Math.max(0, prev - 1));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver, gameStarted, isUserTurn, side]); // curentplayer dependency se maybe issue ho skta hai clearinterval me - checkit later 

  // Initial AI move for black side
  useEffect(() => {
   
    
    // If playing as black, trigger initial AI move
    if (side === 'black') {
      setTimeout(() => {
        makeAIMove(board, 'white');
      }, 0);
    }
  }, [side]);

  const updateCastlingRights = useCallback((piece, start) => {
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
  }, []);
  
  // Move validation
  const validateMove = useCallback((start, end) => {
    if (!start.piece || start.piece.color !== currentPlayer)   return false; // No piece to move or wrong color
    if (end.piece?.color === currentPlayer) return false;    // Cannot capture own piece

    const dx = Math.abs(end.col - start.col); // horizontal distance
    const dy = Math.abs(end.row - start.row);   // vertical distance
    const piece = start.piece;    // piece to move
    const isWhite = piece.color === 'white';  // color of piece
    const direction = isWhite ? -1 : 1;// direction of movement

    // Common validation
    const isPathClear = () => {
      const stepX = Math.sign(end.col - start.col);// horizontal step
      const stepY = Math.sign(end.row - start.row);   // vertical step
      let [x, y] = [start.col + stepX, start.row + stepY];// current position
      
      while (x !== end.col || y !== end.row) { // loop till end position
        if (board[y][x].piece) return false;  // path is blocked
        x += stepX;// move to next position
        y += stepY;
      }
      return true;
    };
    const isSquareAttacked = (board, color, square) => {
      // Check if any enemy piece can attack the given square
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          const sq = board[y][x];
          if (sq.piece && sq.piece.color !== color) {
            const fakeStart = { row: y, col: x, piece: sq.piece };
            if (validateMove(fakeStart, square, true)) {
              return true;
            }
          }
        }
      }
      
      return false;
    };

    // castling updtae
    const updateCastlingRights = (piece, start) => {
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
    };



    // Check if move leaves king in check
    const testBoard = board.map(row => row.map(sq => ({...sq})));// copy of board
    testBoard[end.row][end.col].piece = piece;// move piece to end position
    testBoard[start.row][start.col].piece = null;   // remove piece from start position
    if (isInCheck(testBoard, currentPlayer)) return false;//

    // Piece-specific validation
    switch(piece.type) {
      case 'pawn':
        // Regular move
        if (dx === 0 && !end.piece) {// no horizontal movement and no piece at end position
          if (end.row === start.row + direction) return true;// move one step forward
          // Initial double move
          if ((isWhite && start.row === 6) || (!isWhite && start.row === 1)) {// initial position
            if (end.row === start.row + 2 * direction && isPathClear()) {
              setEnPassantTarget({ col: start.col, row: start.row + direction });//
              return true;
            }
          }
        }
        // Capture
        if (dx === 1 && dy === 1) {
          if (end.piece || (enPassantTarget?.col === end.col && enPassantTarget?.row === end.row)) {
            return true;
          }
        }
        break;

      case 'knight':
        return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);

      case 'bishop':
        return dx === dy && isPathClear();

      case 'rook':
        return (dx === 0 || dy === 0) && isPathClear();

      case 'queen':
        return (dx === dy || dx === 0 || dy === 0) && isPathClear();

     case 'king':
  // Regular move
  if (dx <= 1 && dy <= 1) return true;
  
  // Castling
  if (dx === 2 && dy === 0) {
    const side = end.col === 6 ? 'K' : 'Q';
    if (!castlingRights[currentPlayer][side]) return false;
    
    // Check if path is safe
    const step = end.col > start.col ? 1 : -1;
    for (let col = start.col + step; col !== end.col; col += step) {
      if (isSquareAttacked(board, currentPlayer, { row: start.row, col })) {
        return false;
      }
    }
    
    // Check rook position and path
    const rookCol = end.col === 6 ? 7 : 0;
    const rook = board[start.row][rookCol].piece;
    if (!rook || rook.type !== 'rook' || rook.hasMoved) return false;
    
    return isPathClear();
  }
  break;


  default: return false;
    
}
   
    return false;

    
  }, [board, currentPlayer, enPassantTarget, castlingRights]);
  const makeAIMove = (currentBoard, player) => {
    getBestMove(boardToFEN(currentBoard, player), (move) => {
      const from = parseUCIToCoordinates(move.slice(0, 2), currentBoard);
    const to = parseUCIToCoordinates(move.slice(2, 4), currentBoard);

    if (!from.piece || from.piece.color !== player) {
      console.error('Invalid AI move:', move);
      return;
    }
      const newBoard = makeMove(currentBoard, from, to);
      
      setBoard(newBoard);
      setCurrentPlayer(prev => {
        const newPlayer = prev === 'white' ? 'black' : 'white';
        return newPlayer;
      });
      updateMoveHistory(from, to);
      setIsWhiteTimerActive(prev => !prev);
    });
  };

  // Handle square clicks
  const handleSquareClick = useCallback(async (clickedSquare) => {
    if (currentPlayer !== side) {
      console.log(`Not your turn! Current player: ${currentPlayer}, Your side: ${side}`);
      return;
    }
  
    if (gameOver || !clickedSquare) return;
  
    const newBoard = board.map(row => 
      row.map(sq => ({ ...sq, isSelected: false, isLegalMove: false }))
    );
  
    if (!selectedSquare) {
      if (clickedSquare.piece?.color === currentPlayer) {
        // Show legal moves
        newBoard.forEach(row => row.forEach(sq => {
          sq.isLegalMove = validateMove(clickedSquare, sq);
        }));
        newBoard[clickedSquare.row][clickedSquare.col].isSelected = true;
        setSelectedSquare(clickedSquare);
        
      }
    } else {
      if (validateMove(selectedSquare, clickedSquare)) {
        // Execute move
        const newBoard = makeMove(board, selectedSquare, clickedSquare);
        playCaptureSound();
        
        // Update move history
        updateMoveHistory(selectedSquare, clickedSquare);
  
        // Update game state
        setBoard(newBoard);
        setCurrentPlayer(prev => {
          const newPlayer = prev === 'white' ? 'black' : 'white';
          
          // Trigger AI move if it's the AI's turn
          if ((side === 'white' && newPlayer === 'black') || 
              (side === 'black' && newPlayer === 'white')) {
            setTimeout(() => makeAIMove(newBoard, newPlayer), 0);
          }
          
          return newPlayer;
        });
  
        // Update timer state
        setIsWhiteTimerActive(prev => !prev);
      }
     
      setSelectedSquare(null);
    }
  }, [board, selectedSquare, currentPlayer, validateMove, side, gameOver, makeAIMove]);

  // AI move handler

  // Helper functions
  const makeMove = (board, from, to) => {
    const newBoard = board.map(row => row.map(sq => ({...sq})));
    const piece = newBoard[from.row][from.col].piece;
    
    // Handle castling
    if (piece.type === 'king' && Math.abs(from.col - to.col) === 2) {
      // Determine rook positions
      const isKingside = to.col > from.col;
      const rookFromCol = isKingside ? 7 : 0;
      const rookToCol = isKingside ? 5 : 3;
      
      // Move rook
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
  
    // Update castling rights
    updateCastlingRights(piece, from);
  
    // Handle pawn special cases
    if (piece.type === 'pawn') {
      // Set en passant target
      if (Math.abs(from.row - to.row) === 2) {
        setEnPassantTarget({ col: from.col, row: (from.row + to.row) / 2 });
      } else {
        setEnPassantTarget(null);
      }
  
      // Handle promotion
      if ((piece.color === 'white' && to.row === 0) || (piece.color === 'black' && to.row === 7)) {
        return handlePromotion(newBoard, to, piece.color);
      }
    }

    playCaptureSound();
  
    return newBoard;
  };
  // Promotion handling
const [promotingPawn, setPromotingPawn] = useState(null);

const handlePromotion = (board, position, color) => {
  setPromotingPawn({ position, color });
  return board; // Return original board until promotion is selected
};

const PromotionModal = () => {
  if (!promotingPawn) return null;

  const pieces = ['queen', 'rook', 'bishop', 'knight'];
  const row = promotingPawn.position.row;
  const col = promotingPawn.position.col;

  return (
    <div className="promotion-modal absolute bg-gray-800 p-4 rounded-lg shadow-lg">
      {pieces.map(piece => (
        <button
          key={piece}
          onClick={() => {
            const newBoard = [...board];
            newBoard[row][col].piece = { type: piece, color: promotingPawn.color };
            setBoard(newBoard);
            setPromotingPawn(null);
          }}
          className="w-full p-2 hover:bg-gray-700 text-white"
        >
          {piece.charAt(0).toUpperCase() + piece.slice(1)}
        </button>
      ))}
    </div>
  );
};
const updateMoveHistory = (from, to) => {
  console.log('From:', from, 'To:', to); // Debugging line

  const notation = getMoveNotation(from, to);

  setMoves(prev => {
    let newMoves;
  
    // Calculate the move number
    const moveNumber = Math.ceil((prev.length + 1) / 2);
  console.log('Move number:', moveNumber); // Debugging line
    if (currentPlayer === 'white') {
      // If it's white's move, add a new move pair
      newMoves = [...prev, { moveNumber, white: notation, black: null }];
    } else {
      // If it's black's move, update the last move pair
      if (prev.length > 0) {
        const lastMove = prev[prev.length - 1];
        newMoves = [...prev.slice(0, -1), { ...lastMove, black: notation }];
      } 
    }
  
    console.log('Moves array:', newMoves); // Debugging line
    return newMoves;
  });
};

const getMoveNotation = (from, to) => {
  if (!from.piece) {
    console.error('Invalid move notation - missing piece:', from);
    return '';
  }
  
  const pieceType = from.piece.type;
  const piece = pieceType === 'pawn' ? '' : pieceType.toUpperCase();
  const capture = to.piece ? 'x' : '';
  const file = String.fromCharCode(97 + to.col);
  const rank = 8 - to.row;
  
  return `${piece}${capture}${file}${rank}`;
};

  const parseUCIToCoordinates = (uci, currentBoard) => {
    const col = uci.charCodeAt(0) - 97;
    const row = 8 - parseInt(uci[1]);
    return {
      col,
      row,
      piece: currentBoard[row][col].piece // Add piece reference
    };
  };

  // Check detection
  const isInCheck = (board, color) => {
    const kingPos = findKing(board, color);
    return board.some((row, y) => row.some((sq, x) => 
      sq.piece?.color !== color && validateMove(
        { row: y, col: x, piece: sq.piece },
        kingPos
      )
    ));
  };

  const findKing = (board, color) => {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (board[y][x].piece?.type === 'king' && board[y][x].piece?.color === color) {
          return { row: y, col: x };
        }
      }
    }
    return null;
  };
  return (
    <div className="chess-container p-4 bg-gray-900 min-h-screen text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          {/* Box above the board */}
          <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg mb-4">
            <div className="text-xl font-bold">
              Magnus Carlsen {/* Computer's name */}
            </div>
            <Timer 
              time={side === 'white' ? whiteTime : blackTime}
              isActive={!isUserTurn && gameStarted}
              onTimeEnd={() => setGameOver(true)}
            />
          </div>
  
          {/* Chessboard */}
          <ChessBoard board={flippedBoard} handleSquareClick={handleSquareClick} />
  
          {/* Box below the board */}
          <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg mt-4">
            <div className="text-xl font-bold">
              {username || 'Pampa'} {/* Your username */}
            </div>
            <Timer 
              time={side === 'black' ? whiteTime : blackTime}
              isActive={isUserTurn && gameStarted}
              onTimeEnd={() => setGameOver(true)}
            />
          </div>
        </div>
  
        {/* Move history and controls */}
        <div className="space-y-4">
          <div className="text-center text-xl font-bold">
            {`${['Easy', 'Intermediate', 'Hard'][level / 10]} | ${timeFormat / 60}+0`}
          </div>
  
          <MoveHistory moves={moves} />
  
          <div className="flex space-x-4">
            <ResignButton onResign={() => setGameOver(true)} />
            {gameOver && <StartNewGame onNewGame={() => window.location.reload()} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chess;