import React from "react";

function PlayWith({ onSelect }) {
  const sides = [
    { value: "white", label: "White" },
    { value: "black", label: "Black" },
    { value: "mystery", label: "Mystery" },
  ];

  const handleChange = (e) => {
    const selectedSide = e.target.value;
    if (selectedSide === "mystery") {
      // Randomly select White or Black
      const randomSide = Math.random() < 0.5 ? "white" : "black";
      onSelect(randomSide);
    } else {
      onSelect(selectedSide);
    }
  };

  return (
    <div >
    <select
      onChange={handleChange}
      className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
    >
      {sides.map((side) => (
        <option key={side.value} value={side.value}>
          {side.label}
        </option>
      ))}
    </select>
    </div>
  );
}

export default PlayWith;