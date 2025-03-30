function SelectLevel({ onSelect }) {
    const levels = [
      { value: 0, label: 'Level 0 (Easiest)' },
      { value: 10, label: 'Level 10 (Intermediate)' },
      { value: 20, label: 'Level 20 (Hardest)' },
    ];
  
    return (
      <select
        onChange={(e) => onSelect(Number(e.target.value))}
        className="w-full sm:w-auto px-3 py-2 sm:px-5 sm:py-3 text-sm sm:text-base bg-gray-700 text-white rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        {levels.map((level) => (
          <option key={level.value} value={level.value}>
            {level.label}
          </option>
        ))}
      </select>
    );
    
  }
  
  export default SelectLevel;