import React, { createContext, useState, useRef, useEffect } from "react";
import audioFile from "../assets/intromusic.mp3"; // Replace with your audio file

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize the audio object
    audioRef.current = new Audio(audioFile);
    audioRef.current.loop = true; // Loop the audio
    audioRef.current.volume = 0.6; // Set volume (0 to 1)

    // Play audio after first user interaction
    // const handleFirstInteraction = () => {
    //   audioRef.current.play()
    //     .then(() => setIsPlaying(true))
    //     .catch((err) => console.log("Autoplay blocked:", err));
    //   document.removeEventListener("click", handleFirstInteraction);
    // };

    // document.addEventListener("click", handleFirstInteraction);

    return () => {
      // Cleanup audio on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, []);

  // Function to play audio
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Error playing audio:", err));
    }
  };

  // Function to pause audio
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