import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { profileContext } from "../contexts/profileContext";

const ProgressGraph = () => {
  const { userProfile } = useContext(profileContext);
  const [profile, setProfile] = useState(userProfile);
  useEffect(() => {
    setProfile(userProfile);
  }, [userProfile]);

  const data = profile?.ratingHistory || [];
  const minscore = profile?.MinScore || "N/A";
  const maxscore = profile?.MaxScore || "N/A";

  return (
    <>
      <div
        style={{
          backgroundImage: "url('/whitebg.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="max-w-4xl mx-auto w-full sm:w-[90%] md:w-[80%] mt-6 mb-8 pt-4 pr-4 rounded-xl"
      >
        <ResponsiveContainer width="100%" height={330}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            {/* X-Axis */}
            <XAxis
              dataKey="date"
              stroke="#000"
              strokeWidth={2}
              tick={{ fill: "#000", fontWeight: "bold", fontSize: "12px" }}
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
  
            {/* Y-Axis */}
            <YAxis
              stroke="#000"
              strokeWidth={2}
              tick={{ fill: "#000", fontWeight: "bold", fontSize: "12px" }}
              domain={[0, maxscore + 100]}
            />
  
            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                border: "3px solid #000",
                borderRadius: "7px",
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            />
  
            {/* Legend */}
            <Legend
              wrapperStyle={{
                color: "#000",
                fontWeight: "bold",
                fontSize: "18px",
                paddingTop: "10px",
              }}
            />
  
            {/* Line */}
            <Line
              type="monotone"
              dataKey="score"
              stroke="#000"
              strokeWidth={3}
              dot={{ fill: "#FF6347", r: 4 }}
              activeDot={{ r: 8, stroke: "#FF6347", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
  
      {/* Score Display */}
      <div className="max-w-3xl mx-auto w-full sm:w-[90%] md:w-[80%] mb-14 flex flex-wrap justify-center sm:justify-between text-center bg-black border border-white p-4 rounded-lg mt-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center mx-4 my-2">
          <i className="fas fa-trophy text-green-500 text-lg sm:text-xl mr-2"></i>
          <span className="text-white text-sm sm:text-base font-extrabold">Max Score:</span>
          <span className="text-green-500 text-sm sm:text-base font-extrabold ml-1">{maxscore}</span>
        </div>
        <div className="flex items-center mx-4 my-2">
          <i className="fas fa-trophy text-red-500 text-lg sm:text-xl mr-2"></i>
          <span className="text-white text-sm sm:text-base font-extrabold">Min Score:</span>
          <span className="text-red-500 text-sm sm:text-base font-extrabold ml-1">{minscore}</span>
        </div>
      </div>
    </>
  );
  
};

export default ProgressGraph;
