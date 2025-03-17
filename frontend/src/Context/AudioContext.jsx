// AudioContext.js
import React, { createContext, useState, useRef, useEffect } from "react";
import audioFile from "../assets/intromusic.mp3";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize the audio object
    audioRef.current = new Audio(audioFile);
    audioRef.current.loop = true; // Loop the audio
    audioRef.current.volume = 1; // Set volume (0 to 1)

    // Play audio after first user interaction
    const handleFirstInteraction = () => {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Autoplay blocked:", err));
      document.removeEventListener("click", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);

    return () => {
      // Cleanup audio on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};