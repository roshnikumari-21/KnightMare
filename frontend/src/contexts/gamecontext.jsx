import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { commoncontext } from "./commoncontext";
import { profileContext } from "./profileContext";
export const gamecontext = createContext();
import { initialBoard } from "../chess-logic/functions";
import { initCutPieces } from "../chess-logic/CutPieces";
import { useStockfish } from "../stockfish/UseStockfish";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const GameProvider = (props) => {
  const { backendUrl, token, user, setUser } = useContext(commoncontext);
  const { setUserProfile } = useContext(profileContext);
  const [startTime, setStartTime] = useState(new Date());

  const loadGameState = () => {
    try {
      const savedGame = localStorage.getItem('currentGame');
      if (savedGame) {
        const parsed = JSON.parse(savedGame);
        if (parsed.gameResult === null || parsed.gameResult === 'ongoing') {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load game state", e);
    }
    return null;
  };

  const savedGame = loadGameState();
  const [level, setLevel] = useState(savedGame?.level || 0);
  const [timeFormat, setTimeFormat] = useState(savedGame?.timeFormat || 300);
  const [side, setSide] = useState(savedGame?.side || "white");
  const [showBoard, setShowBoard] = useState(savedGame?.gameStarted || false);
  const [board, setBoard] = useState(savedGame?.board || initialBoard());
  const [currentPlayer, setCurrentPlayer] = useState(savedGame?.currentPlayer || "white");
  const [gameOver, setGameOver] = useState(savedGame?.gameOver || false);
  const [selectedSquare, setSelectedSquare] = useState(savedGame?.selectedSquare || null);
  const [moves, setMoves] = useState(savedGame?.moves || []);
  const [enPassantTarget, setEnPassantTarget] = useState(savedGame?.enPassantTarget || null);
  const [legalMoves, setLegalMoves] = useState(savedGame?.legalMoves || []);
  const [kingInCheck, setKingInCheck] = useState(savedGame?.kingInCheck || {
    white: false,
    black: false,
  });
  const [castlingRights, setCastlingRights] = useState(savedGame?.castlingRights || {
    white: { K: true, Q: true },
    black: { K: true, Q: true },
  });
  const [gameStarted, setGameStarted] = useState(savedGame?.gameStarted || false);
  const [whiteTime, setWhiteTime] = useState(savedGame?.whiteTime || timeFormat);
  const [blackTime, setBlackTime] = useState(savedGame?.blackTime || timeFormat);
  const [gameResult, setGameResult] = useState(savedGame?.gameResult || null);
  const [cutPieces, setCutPieces] = useState(savedGame?.cutPieces || initCutPieces());
  const [gameId, setGameId] = useState(savedGame?.gameId || uuidv4());

  const { getBestMove } = useStockfish(level);

  // Save game state to localStorage
  useEffect(() => {
    if (gameStarted) {
      const gameState = {
        level,
        timeFormat,
        side,
        showBoard,
        board,
        currentPlayer,
        gameOver,
        selectedSquare,
        moves,
        enPassantTarget,
        legalMoves,
        kingInCheck,
        castlingRights,
        gameStarted,
        whiteTime,
        blackTime,
        gameResult,
        cutPieces,
        gameId,
        startTime: startTime.toISOString() // Save start time
      };
      localStorage.setItem('currentGame', JSON.stringify(gameState));
    }
  }, [
    level,
    timeFormat,
    side,
    showBoard,
    board,
    currentPlayer,
    gameOver,
    selectedSquare,
    moves,
    enPassantTarget,
    legalMoves,
    kingInCheck,
    castlingRights,
    gameStarted,
    whiteTime,
    blackTime,
    gameResult,
    cutPieces,
    gameId,
    startTime
  ]);

  useEffect(() => {
    setGameStarted(moves.length >= 1);
    if (moves.length >= 1) {
      setShowBoard(true);
      if (moves.length === 1) {
        setStartTime(new Date());
      }
    }
  }, [moves]);

  const endGame = async (result) => {
    setGameResult(result);
    setGameOver(true);
    if(result === 'player_resign' && moves.length < 5){ setGameResult('false_game');result='false_game';}
    console.log("Ending game with result:", result);
    try {
      if (!result || result === 'ongoing' || result==='false_game'){
        return;
      }

      const difficulty = ["easy", "medium", "hard"][level];
      const now = new Date();
      const gameDuration = Math.floor((now - startTime) / 1000);
      const gameData = {
        gameId,
        difficulty,
        moves: moves.map(move => `${move.white || ''},${move.black || ''}`).filter(Boolean),
        result,
        playerRating: user?.score || 0,
        capturedPieces: {
          player: cutPieces[side === 'white' ? 'black' : 'white'].map(p => `${p.type}-${p.color}`),
          ai: cutPieces[side === 'white' ? 'white' : 'black'].map(p => `${p.type}-${p.color}`)
        },
        duration: gameDuration,
        createdAt: startTime.toISOString(),
        endedAt: now.toISOString()
      };

      console.log("Saving game data:", gameData);

      if (token && user) {
        const response = await axios.post(`${backendUrl}/api/games/end`, gameData, {
          headers: {
            'userId': user._id,
          }
        });

        if (response.data.success) {
          const updatedUser = response.data.user;
          const processedUser = {
            ...updatedUser,
            ratingHistory: updatedUser.ratingHistory.map(item => ({
              ...item,
              date: new Date(item.date)
            })),
            dailyActivity: updatedUser.dailyActivity.map(item => ({
              date: new Date(item.date)
            }))
          };

          setUser(processedUser);
          setUserProfile(prev => ({
            ...prev,
            score: processedUser.score,
            gamesPlayed: processedUser.gamesPlayed,
            gamesWon: processedUser.gamesWon,
            gamesLost: processedUser.gamesLost,
            gamesDrawn: processedUser.gamesDrawn,
            gamesResigned: processedUser.gamesResigned,
            gameHistory: processedUser.gameHistory,
            ratingHistory: processedUser.ratingHistory,
            dailyActivity: processedUser.dailyActivity,
            currentStreak: processedUser.currentStreak,
            longestStreak: processedUser.longestStreak
          }));
        }
      }
    } catch (error) {
      console.error("Failed to save game result:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    } finally {
      localStorage.removeItem('currentGame');
      console.log('Local storage cleared');
    }
  };

  const resetGame = () => {
    setBoard(initialBoard());
    setCurrentPlayer("white");
    setGameOver(false);
    setSelectedSquare(null);
    setMoves([]);
    setEnPassantTarget(null);
    setLegalMoves([]);
    setKingInCheck({ white: false, black: false });
    setCastlingRights({ white: { K: true, Q: true }, black: { K: true, Q: true } });
    setGameStarted(false);
    setWhiteTime(timeFormat);
    setBlackTime(timeFormat);
    setGameResult(null);
    setCutPieces(initCutPieces());
    setGameId(uuidv4());
    setStartTime(new Date());
    localStorage.removeItem('currentGame');
    setShowBoard(true);
  };

  const flippedBoard = useMemo(
    () =>
      side === "black"
        ? [...board].reverse().map((row) => [...row].reverse())
        : board,
    [board, side]
  );

  const value = {
    board,
    setBoard,
    currentPlayer,
    setCurrentPlayer,
    gameOver,
    setGameOver,
    selectedSquare,
    setSelectedSquare,
    moves,
    setMoves,
    enPassantTarget,
    setEnPassantTarget,
    legalMoves,
    setLegalMoves,
    kingInCheck,
    setKingInCheck,
    castlingRights,
    setCastlingRights,
    gameStarted,
    setGameStarted,
    whiteTime,
    setWhiteTime,
    blackTime,
    setBlackTime,
    gameResult,
    setGameResult,
    getBestMove,
    endGame,
    cutPieces,
    setCutPieces,
    flippedBoard,
    side,
    setSide,
    timeFormat,
    setTimeFormat,
    level,
    setLevel,
    showBoard,
    setShowBoard,
    resetGame,
    gameId
  };
  return (
    <gamecontext.Provider value={value}>{props.children}</gamecontext.Provider>
  );
};

export default GameProvider;
