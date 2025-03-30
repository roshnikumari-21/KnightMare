function SelectTimeFormat({ onSelect }) {
    const formats = [
      { value: 300, label: '5+0' },
      { value: 600, label: '10+0' },
      { value: 900, label: '15+0' },
    ];
  
    return (
      <select
        onChange={(e) => onSelect(Number(e.target.value))}
        className="w-full sm:w-auto px-3 py-2 sm:px-5 sm:py-3 text-sm sm:text-base bg-gray-700 text-white rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        {formats.map((format) => (
          <option key={format.value} value={format.value}>
            {format.label}
          </option>
        ))}
      </select>
    );
  }    
  
  export default SelectTimeFormat;