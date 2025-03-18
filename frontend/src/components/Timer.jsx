import React, { useEffect, useState } from 'react';

function Timer({ time, onTimeEnd, isActive }) {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          onTimeEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onTimeEnd]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`p-3 rounded-lg ${isActive ? 'bg-gray-700' : 'bg-gray-600'} text-white font-mono`}>
      <span>{formatTime(seconds)}</span>
    </div>
  );
}

export default Timer;