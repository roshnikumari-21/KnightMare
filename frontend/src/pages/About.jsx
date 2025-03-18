import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-black text-red-500 min-h-screen flex flex-col items-center justify-center p-10">
      <h1 style={{ fontFamily: "'Creepster', cursive" }}   className="text-5xl  grad mb-6  animate-pulse">
        Knight...mare!!!
      </h1>
      <p className="text-lg text-gray-300 text-center max-w-3xl mb-8">
        Step into the abyss, where darkness reigns and only the bravest dare to venture. 
        Knightmare isn’t just a game—it’s a test of your courage, wits, and survival.
      </p>
      
      <div className=" bg-transparent p-6 rounded-lg shadow-lg border border-red-600 max-w-2xl">
        <h2 className="text-3xl font-bold text-red-500 mb-4 ">Who Are We?</h2>
        <p className="text-gray-300 mb-4">
          We are the architects of nightmares, the whisperers in the dark. Our mission is to bring 
          the most chilling, mind-bending experiences to life. Every shadow hides a secret, and every move you make could be your last.
        </p>
        <h2 className="text-3xl font-bold text-red-500 mb-4 ">What is Knightmare?</h2>
        <p className="text-gray-300">
          Knightmare is an eerie chess battle like no other. The pieces move in silence, plotting their own fate. 
          Will you emerge victorious, or will you be lost in the void forever?
        </p>
      </div>

      <p className="text-gray-500 italic mt-10 ">
        "Once you enter... there's no turning back."
      </p>
    </div>
  );
};

export default AboutUs;