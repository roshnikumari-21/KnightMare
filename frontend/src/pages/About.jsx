

// import React from "react";
// import { motion } from "framer-motion"; // Import Framer Motion

// const AboutUs = () => {
//   const teamMembers = [
//     { name: "Aprajita Kumari", role: "Designer", avatar: "/useravatar.png" },
//     { name: "Roshni Kumari", role: "Developer", avatar: "/useravatar.png" },
//     { name: "Sakshi Kumari", role: "Developer", avatar: "/useravatar.png" },
//     { name: "Ayush Kumar Singh", role: "Backend Developer", avatar: "/useravatar.png" },
//     { name: "Prince Kumar", role: "Frontend Developer", avatar: "/useravatar.png" },
//     { name: "Gobind Kumar", role: "QA Tester", avatar: "/useravatar.png" },
//   ];

//   // Animation variants for team members
//   const teamMemberVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
//   };

//   return (
//     <div style={{ backgroundImage: "url('/bg2.jpg')" }} className="bg-black text-gray-100 p-8 font-sans">
//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <h1 className="text-4xl font-bold mb-8 text-center text-white">
//           About Knightmare Chess
//         </h1>

//         {/* Description Section */}
//         <div className="p-8 rounded-lg shadow-lg mb-6">
//           <p className="text-lg text-gray-300 leading-relaxed">
//             Welcome to <span className="text-blue-500font-bold">Knightmare Chess</span>, a cutting-edge chess web app designed to provide users with the best experience in playing chess against AI, analyzing previous games, and improving their skills. Our platform offers a variety of features, including:
//           </p>
//           <ul className="list-disc list-inside mt-4 text-gray-300">
//             <li><span className="text-red-500">AI Opponent:</span> Play against a powerful AI that adapts to your skill level.</li>
//             <li><span className="text-red-500">Game Analysis:</span> Analyze your previous games to identify strengths and weaknesses.</li>
//             <li><span className="text-red-500">Leaderboard:</span> Track your scores and compete with other players.</li>
//             <li><span className="text-red-500">Heatmap:</span> Visualize your most frequent moves and strategies.</li>
            
//           </ul>
//           <p className="text-lg text-gray-300 mt-4">
//             Our mission is to make chess accessible, engaging, and fun for everyone, from beginners to advanced players. Join us and step into the world of <span className="text-red-500">Knightmare Chess</span>, where strategy meets innovation!
//           </p>
//         </div>

//         {/* Team Section */}
//         <div className="p-8 backdrop-blur-sm rounded-lg shadow-lg">
//           <h2 className="text-3xl font-semibold mb-8 text-center text-red-800">
//             The Team
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {teamMembers.map((member, index) => (
//               <motion.div
//                 key={index}
//                 variants={teamMemberVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the element is in view
//                 className="flex flex-col items-center text-center"
//               >
//                 <img
//                   src={member.avatar}
//                   alt={member.name}
//                   className="w-32 h-32 rounded-full bg-black mb-4 border-4 border-white"
//                 />
//                 <h3 className="text-xl font-semibold text-gray-100">{member.name}</h3>
//                 <p className="text-gray-400">{member.role}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;



import React, { useContext } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { commoncontext } from "../contexts/commoncontext";

const AboutUs = () => {
  const teamMembers = [
    { name: "Aprajita Kumari", role: "Backend Developer", avatar: "/useravatar.png" },
    { name: "Roshni Kumari", role: "Frontend Developer", avatar: "/useravatar.png" },
    { name: "Sakshi Kumari", role: "Game Developer", avatar: "/useravatar.png" },
    { name: "Ayush Kumar Singh", role: "Full Stack Developer", avatar: "/useravatar.png" },
    { name: "Prince Kumar", role: "Designer", avatar: "/useravatar.png" },
    { name: "Gobind Kumar", role: "QA Tester", avatar: "/useravatar.png" },
  ];

  const {token,user,showNavbar , setShowNavbar} = useContext(commoncontext);
     setShowNavbar(true);

  // Animation variants for team members
  const teamMemberVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  // Animation variants for feature boxes
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  // Features of the app
  const features = [
    { title: "AI Opponent", description: "Play against a powerful AI that adapts to your skill level." },
    { title: "Game Analysis", description: "Analyze your previous games to identify strengths and weaknesses." },
    { title: "Leaderboard", description: "Track your scores and compete with other players." },
    { title: "Heatmap", description: "Visualize your most frequent moves and strategies." },
    
  ];

  return (
    <div  className="bg-black text-gray-100 p-8 glowing-bg  font-sans">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          About Knightmare Chess
        </h1>
        <p className="text-lg text-gray-300 mt-4">
            Our mission is to make chess accessible, engaging, and fun for everyone, from beginners to advanced players. Join us and step into the world of <span className="text-blue-500">Knightmare Chess</span>, where strategy meets innovation!
         </p>
        

        {/* Features Section */}
        <motion.div
          className="p-8 rounded-lg shadow-lg mb-6 backdrop-blur-sm bg-black/50"
          variants={featureVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center text-blue-800">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={featureVariants}
                className="p-6 rounded-lg shadow-md border-white shadow-blue-700   border "
              >
                <h3 className="text-xl font-semibold text-blue-500 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <div className="p-8 backdrop-blur-sm rounded-lg shadow-lg ">
          <h2 className="text-4xl  font-semibold mb-8 text-center text-blue-900">
            The Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={teamMemberVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the element is in view
                className="flex flex-col items-center text-center"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-32 h-32 rounded-full bg-black mb-4 border-4 border-white"
                />
                <h3 className="text-xl font-semibold text-gray-100">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

