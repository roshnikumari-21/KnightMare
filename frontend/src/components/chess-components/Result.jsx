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
      stalemate: {
        title: "Stalemate!",
        message: "A perfectly balanced game - like yin and yang",
        emoji: "⚖️"
      },
      threefold: {
        title: "Draw Declared",
        message: "Threefold repetition - a meeting of grandmaster minds",
        emoji: "🤝"
      }
    };
  
    return (
      <div className="result-overlay bg-gray-800/90 p-6 rounded-lg shadow-xl text-center animate-fade-in">
        <div className="text-4xl mb-2">{messages[result].emoji}</div>
        <h3 className="text-2xl font-bold text-gold-400 mb-1">
          {messages[result].title}
        </h3>
        <p className="text-lg">{messages[result].message}</p>
      </div>
    );
  };
  
  export default Result;