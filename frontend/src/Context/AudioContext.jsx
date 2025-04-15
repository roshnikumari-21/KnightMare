import React, { createContext, useState, useEffect } from "react";
import audioFile from "../assets/intromusic.mp3";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audio] = useState(new Audio(audioFile));
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.05;

    // const playOnLoad = async () => {
    //   try {
    //     await audio.play();
    //     setIsPlaying(true);
    //   } catch (error) {
    //     console.log("Autoplay failed:", error);
    //   }
    // };

    // playOnLoad();

    return () => {
      audio.pause();
    };
  }, [audio]);
  const playAudio = () => {
    audio.play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.log("Error playing audio:", err));
  };
  const pauseAudio = () => {
    audio.pause();
    setIsPlaying(false);
  };
  return (
    <AudioContext.Provider value={{ isPlaying, playAudio, pauseAudio }}>
      {children}
    </AudioContext.Provider>
  );
};
