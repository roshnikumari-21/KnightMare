import React from 'react';

function Timer({ time, onTimeEnd, isActive }){
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  return (
    <div className={`p-2 rounded-lg ${isActive ? 'bg-gray-700' : 'bg-gray-600'} text-white font-mono`}>
      {formatTime(time)}
    </div>
  );
}
export default Timer;