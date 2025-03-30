function ResignButton({ onResign, disabled }) {
  return (
    <button
      onClick={() => window.confirm('Are you sure you want to resign?') && onResign()}
      className={`px-4 py-2 ${
        disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
      } text-white rounded-lg transition-colors`}
      disabled={disabled}
    >
      Resign
    </button>
  );
}

export default ResignButton;
