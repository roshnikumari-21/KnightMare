import React, { useState, useCallback, useEffect, useMemo } from 'react';
import ChessBoard from "./ChessBoard";
import Timer from './Timer';
import ResignButton from './ResignButton';
import MoveHistory from './MoveHistory';
import StartNewGame from './StartNewGame';
import { useStockfish } from '../stockfish/UseStockfish';
import { 
    validateMove,
    ShowLegalMoves,
    initialBoard,
    boardToFEN,
    checkGameState
} from '../chess-logic/functions';
import { makeMove } from '../chess-logic/MoveExecution';
import captureSound from "../assets/captureSound.mp3";
import notifySound from "../assets/notifySound.mp3"

function Chess({ level, timeFormat, side }) {
  // Game state
  const [board, setBoard] = useState(initialBoard());
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [gameOver, setGameOver] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [moves, setMoves] = useState([]);
  const [enPassantTarget, setEnPassantTarget] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [kingInCheck, setKingInCheck] = useState({ white: false, black: false });
  const [castlingRights, setCastlingRights] = useState({ 
      white: { K: true, Q: true },
      black: { K: true, Q: true }
  });

  // Timer state
  const [gameStarted, setGameStarted] = useState(false);
const [isUserTurn, setIsUserTurn] = useState(false);

  const [whiteTime, setWhiteTime] = useState(timeFormat);
  const [blackTime, setBlackTime] = useState(timeFormat);
 



  

  useEffect(() => {
    console.log("Legal moves:", legalMoves); // debugging
  }, [legalMoves]);



  useEffect(() => {
    const whiteState = checkGameState(board, 'white', castlingRights, enPassantTarget);
    const blackState = checkGameState(board, 'black', castlingRights, enPassantTarget);
    if(whiteState=='checkmate'){
      setGameOver(true);
    }
    if(blackState=='checkmate'){
      setGameOver(true);
    }
    setKingInCheck({
      white: whiteState.includes('check'),
      black: blackState.includes('check')
    });
  }, [board, castlingRights, enPassantTarget]); 

 



  useEffect(() => {
    console.log("Current moves:", moves);
  }, [moves]);
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



  // Timer control

useEffect(() => {
  if (gameOver || !gameStarted) return;

  const interval = setInterval(() => {
    // Deduct time based on current player
    if (currentPlayer === 'white') {
      setWhiteTime(prev => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    } else {
      setBlackTime(prev => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }
  }, 1000);

  return () => clearInterval(interval);
}, [gameOver, gameStarted, currentPlayer]); // Only depend on these




  // Initial AI move for black side
  useEffect(() => {
   
    
    // If playing as black, trigger initial AI move
    if (side === 'black') {
      console.log("current player ",currentPlayer)
      setTimeout(() => {
        makeAIMove(board, 'white');
      }, 0);
    }
  }, [side]);

 
  


 // In your handleSquareClick function:
 const handleSquareClick = useCallback((clickedSquare) => {
  if (currentPlayer !== side || gameOver || !clickedSquare) return;

  // Reset board selections
  const newBoard = board.map(row => 
    row.map(sq => ({ ...sq, isSelected: false }))
  );

  if (!selectedSquare) {
    if (clickedSquare.piece?.color === currentPlayer) {
      // Calculate legal moves
      const moves = ShowLegalMoves(
        board,
        clickedSquare.piece,
        clickedSquare,
        castlingRights,
        enPassantTarget,
        currentPlayer
      );

      // Update board with selection
      newBoard[clickedSquare.row][clickedSquare.col].isSelected = true;
      setBoard(newBoard);
      setSelectedSquare(clickedSquare);
      setLegalMoves(moves);
    }
  } else {
    const isValidMove = validateMove(
      board,
      selectedSquare,
      clickedSquare,
      currentPlayer,
      castlingRights,
      enPassantTarget
    );

    if (isValidMove) {
      // Create a copy of current castling rights
      const updatedCastlingRights = JSON.parse(JSON.stringify(castlingRights));
      
      const updatedBoard = makeMove(
        newBoard,
        selectedSquare,
        clickedSquare,
        updatedCastlingRights, // Pass the copy
        (newRights) => setCastlingRights(newRights),
        setEnPassantTarget
      );

      // Update game state
      setBoard(updatedBoard);
      updateMoveHistory(selectedSquare, clickedSquare, currentPlayer);
      
      // Update check status immediately
      const whiteCheck = checkGameState(updatedBoard, 'white', updatedCastlingRights, enPassantTarget).includes('check');
      const blackCheck = checkGameState(updatedBoard, 'black', updatedCastlingRights, enPassantTarget).includes('check');
      
      setKingInCheck({
        white: whiteCheck,
        black: blackCheck
      });

      // Switch player
      const newPlayer = currentPlayer === 'white' ? 'black' : 'white';
      setCurrentPlayer(newPlayer);
      setSelectedSquare(null);
      setLegalMoves([]);

      // Trigger AI move if needed
      if ((side === 'white' && newPlayer === 'black') || 
          (side === 'black' && newPlayer === 'white')) {
        setTimeout(() => makeAIMove(updatedBoard, newPlayer), 100);
      }
    } else {
      // Invalid move - reset
      setBoard(newBoard);
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  }
}, [board, selectedSquare, currentPlayer, side, gameOver, castlingRights, enPassantTarget]);
  // AI move handler
  const makeAIMove = useCallback((currentBoard, player) => {
    getBestMove(boardToFEN(currentBoard, player), (move) => {
        const from = parseUCIToCoordinates(move.slice(0, 2), currentBoard);
        const to = parseUCIToCoordinates(move.slice(2, 4), currentBoard);

        if (!from.piece || from.piece.color !== player) {
            console.error('Invalid AI move:', move);
            return;
        }
        const updatedCastlingRights = JSON.parse(JSON.stringify(castlingRights));
        
        const newBoard = makeMove(
          currentBoard,
          from,
          to,
          updatedCastlingRights,
          (newRights) => setCastlingRights(newRights),
          setEnPassantTarget
        );
        setBoard(newBoard);
        updateMoveHistory(from, to, player);
        
        // Switch turn back to human player
        setCurrentPlayer(player === 'white' ? 'black' : 'white');
        setCurrentPlayer(player === 'white' ? 'black' : 'white');
    });
}, [boardToFEN, castlingRights]);

  // Promotion handling
const [promotingPawn , setPromotingPawn] = useState(null);

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
const updateMoveHistory = (from, to, movingPlayer) => {
  const notation = getMoveNotation(from, to);
  
  setMoves(prev => {
    // For white's move - create new pair
    if (movingPlayer === 'white') {
      const moveNumber = Math.floor(prev.length) + 1;
      return [...prev, { 
        moveNumber, 
        white: notation, 
        black: null 
      }];
    }
    // For black's move - update last pair
    else {
      // If no moves exist yet (black moving first)
      if (prev.length === 0) {
        return [{ 
          moveNumber: 1, 
          white: null, 
          black: notation 
        }];
      }
      
      const lastMove = prev[prev.length - 1];
      
      // If last move has white but no black, update it
      if (lastMove.white && !lastMove.black) {
        return [
          ...prev.slice(0, -1),
          { 
            ...lastMove, 
            black: notation 
          }
        ];
      }
      // Otherwise create new move pair (shouldn't happen in standard chess)
      else {
        const moveNumber = prev.length + 1;
        return [...prev, { 
          moveNumber, 
          white: null, 
          black: notation 
        }];
      }
    }
  });
};
const getMoveNotation = (from, to, board) => {
  if (!from.piece) return '';

  const pieceType = from.piece.type;
  const isCapture = to.piece !== null;
  const file = String.fromCharCode(97 + to.col);
  const rank = 8 - to.row;

  // Handle castling
  if (pieceType === 'king' && Math.abs(from.col - to.col) === 2) {
    return to.col > from.col ? 'O-O' : 'O-O-O';
  }

  // Handle pawn moves
  if (pieceType === 'pawn') {
    if (isCapture) {
      const fromFile = String.fromCharCode(97 + from.col);
      return `${fromFile}x${file}${rank}`;
    }
    return `${file}${rank}`;
  }

  // Handle other pieces
  const pieceLetter = {
    knight: 'N',
    bishop: 'B',
    rook: 'R',
    queen: 'Q',
    king: 'K'
  }[pieceType];

  return `${pieceLetter}${isCapture ? 'x' : ''}${file}${rank}`;
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
    <div className="chess-container p-3 bg-gray-900   text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="md:col-span-2">
          {/* Box above the board */}
          <div className="flex justify-between items-center  bg-gray-800 rounded-lg ">
            <div className="text-md font-bold pl-4">
              Magnus Carlsen {/* Computer's name */}
            </div>
            <Timer 
             time={side === 'white' ? blackTime : whiteTime}
             isActive={
               currentPlayer === (side === 'white' ? 'black' : 'white') && 
               gameStarted && 
               !gameOver
             }
             onTimeEnd={() => setGameOver(true)}
            />
            </div>
  
          {/* Chessboard */}
          <ChessBoard 
            board={flippedBoard}
            handleSquareClick={handleSquareClick}
            legalMoves={legalMoves}
            side={side}
            kingInCheck={kingInCheck}
          />
          {/* Box below the board */}
          <div className="flex justify-between items-center  bg-gray-800 rounded-lg ">
            <div className="text-md font-bold pl-4">
              { 'Pampa'|| username} {/* Your username */}
            </div>
            <Timer 
              time={side === 'white' ? whiteTime : blackTime}
              isActive={
                currentPlayer === side && 
                gameStarted && 
                !gameOver
              }
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