import React, { createContext, useState, useRef, useEffect } from "react";
import audioFile from "../assets/intromusic.mp3";
export const AudioContext = createContext();
export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  useEffect(() => {
    audioRef.current = new Audio(audioFile);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.05;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Error playing audio:", err));
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  return (
    <AudioContext.Provider value={{ isPlaying, playAudio, pauseAudio }}>
      {children}
    </AudioContext.Provider>
  );
};