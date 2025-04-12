import React, { useEffect } from 'react';

function Timer({ time, onTimeEnd, isActive }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  useEffect(() => {
        if (time == 0){
          console.log("timer called");
          onTimeEnd();}
  }, [time]);

  const getTimerClass = () => {
    let baseClass = 'p-2 rounded-lg text-white font-mono transition-all duration-300';
    
    if (!isActive) {
      return `${baseClass} bg-gray-600`;
    }
    
    if (time <= 10) {
      return `${baseClass} bg-red-700 animate-pulse`;
    } else if (time <= 30) {
      return `${baseClass} bg-yellow-700`;
    }
    
    return `${baseClass} bg-gray-700`;
  };

  return (
    <div className={getTimerClass()}>
      {formatTime(time)}
    </div>
  );
}

export default Timer;