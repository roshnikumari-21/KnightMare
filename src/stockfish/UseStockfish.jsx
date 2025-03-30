import { useEffect, useRef } from 'react';

export function useStockfish(difficulty) {
  const stockfishRef = useRef(null);

  useEffect(() => {
    const worker = new Worker(new URL('../public/stockfish.js', import.meta.url), {
      type: 'classic',
    });

    worker.postMessage('uci');
    worker.postMessage(`setoption name Skill Level value ${difficulty}`);
    stockfishRef.current = worker;

    return () => worker.terminate();
  }, [difficulty]);

  const getBestMove = (fen, callback) => {
    if (!stockfishRef.current) return;

    stockfishRef.current.postMessage(`position fen ${fen}`);
    stockfishRef.current.postMessage('go movetime 2000');

    stockfishRef.current.onmessage = (e) => {
      if (e.data.startsWith('bestmove')) {
        const move = e.data.split(' ')[1];
        console.log('Stockfish Response:', move); // Log the response
        callback(move);
      }
    };
  };

  return { getBestMove };
}