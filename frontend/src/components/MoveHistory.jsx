import React, { useEffect, useRef } from "react";
//THis component is just taking the moves from its parent component and rendering it dynamically.
// so there is no backend interaction or anything like that for thsi component.
function MoveHistory({ moves }){
  const historyRef = useRef(null);
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [moves]);

  return (
    <div ref={historyRef} className="bg-gray-800 relative z-10 p-4 rounded-lg w-64 h-80 overflow-y-auto">
      <h3 className="text-lg font-bold mb-2 text-white">Move History</h3>
      <div className="space-y-2 text-white">
        {moves.map((move, index) => (
          <div key={index} className="text-sm grid grid-cols-3 gap-2 items-center">
            <span className="font-bold">{index + 1}.</span> 
            <span className="text-white">{move.white}</span>
            <span className="text-white">{move.black || "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoveHistory;