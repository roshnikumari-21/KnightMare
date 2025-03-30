function ResignButton({ onResign, disabled }) {
  return (
    <button
      onClick={() => window.confirm('Are you sure you want to resign?') && onResign()}
      className={`px-3 py-2 sm:px-5 sm:py-3 text-sm sm:text-base font-semibold rounded-lg transition-colors ${
        disabled 
          ? 'bg-gray-500 opacity-50 cursor-not-allowed' 
          : 'bg-red-500 hover:bg-red-600'
      } text-white`}
      disabled={disabled}
    >
      Resign
    </button>
  );
  
}

export default ResignButton;
