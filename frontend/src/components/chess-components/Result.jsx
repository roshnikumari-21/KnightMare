import React from 'react';
// this component gets result and playercolor from  chess.jsx and just shows result , finally
// needs no interaction with backend.

const Result = ({ result, playerColor }) => {
  const messages = {
    win: {
      title: "Brilliant Victory!",
      message: "You've checkmated your opponent with style!",
      emoji: "🏆"
    },
    lose: {
      title: "Game Over",
      message: "Your king has fallen, but you'll return stronger!",
      emoji: "💪"
    },
    player_resign:{
      title: "You Resigned",
      message: "There is a penalty for resigning and that is more than losing a game, so think before resigning next time.",
      emoji: "☠️"
    },
    player_timeout:{
      title: "TimeOut",
      message: "Uh oh!You have no time left , think faster next time.",
      emoji: "🤣"
    },
    ai_timeout:{
      title: "TimeOut",
      message: "We are sorry that this AI was too slow , anyway congrats!",
      emoji: "😉"
    },
    stalemate: {
      title: "Stalemate!",
      message: "A perfectly balanced game - like yin and yang",
      emoji: "⚖️"
    },
    threefold: {
      title: "Draw Declared",
      message: "Threefold repetition - a meeting of grandmaster minds",
      emoji: "🤝"
    },

    default: {
      title: "Game Ended",
      message: "The game has concluded",
      emoji: "🎲"
    }
  };
  const message = messages[result] || messages.default;

  return (
    <div className="result-overlay bg-gray-800/90 p-6 rounded-lg shadow-xl text-center animate-fade-in">
      <div className="text-4xl mb-2">{message.emoji}</div>
      <h3 className="text-2xl font-bold text-gold-400 mb-1">
        {message.title}
      </h3>
      <p className="text-lg">{message.message}</p>
    </div>
  );
};

export default Result;