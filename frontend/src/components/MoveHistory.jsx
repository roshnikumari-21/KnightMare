import React from 'react';

function MoveHistory({ moves }) {
  return (
    <div  className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Move History</h3>
      <div className="space-y-2">
        {moves.map((move, index) => (
          <div key={index} className="text-sm">
            {/* Display move number */}
            <span className="font-bold">{move.moveNumber}.</span>
            
            {/* Display white's move */}
            <span className="ml-2">{move.white}</span>
            
            {/* Display black's move if it exists */}
            {move.black && <span className="ml-2">{move.black}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoveHistory;