function StartNewGame({ onNewGame }) {
  return (
    <button
      onClick={onNewGame}
      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors sm:px-6 sm:py-3 md:px-8 md:py-4"
    >
      New Game
    </button>
  );
  
  }
  
  export default StartNewGame;