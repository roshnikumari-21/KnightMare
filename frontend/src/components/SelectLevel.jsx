function SelectLevel({ onSelect }) {
    const levels = [
      { value: 0, label: 'Level 0 (Easiest)' },
      { value: 1, label: 'Level 10 (Intermediate)' },
      { value: 2, label: 'Level 20 (Hardest)' },
    ];
  
    return (
      <select
        onChange={(e) => onSelect(Number(e.target.value))}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
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