function DrawButton({ onDraw }) {
    return (
      <button
        onClick={() => window.confirm('Offer a draw to your opponent?') && onDraw()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Offer Draw
      </button>
    );
  }
  
  export default DrawButton;