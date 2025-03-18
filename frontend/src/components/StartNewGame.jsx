function StartNewGame({ onNewGame }) {
    return (
      <button
        onClick={onNewGame}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        New Game
      </button>
    );
  }
  
  export default StartNewGame;