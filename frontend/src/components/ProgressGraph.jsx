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
    <div className=" mx-4 sm:mx-8 md:mx-14 mt-4 sm:mt-6 my-4 md:mb-6 sm:mb-8">
      {/* Chart Container */}
      <div
        style={{
          backgroundImage: "url('/whitebg.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="pt-4 pr-2  rounded-xl"
      >
        <ResponsiveContainer  width="100%" height={250}>
          <LineChart
            data={data}
            margin={{ 
              top: 20, 
              right: 10, 
              left: 0, 
              bottom: 5 
            }}
          >
            {/* X-Axis */}
            <XAxis
              dataKey="date"
              stroke="#000"
              strokeWidth={1}
              tick={{ 
                fill: "#000", 
                fontWeight: "bold", 
                fontSize: "10px" 
              }}
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />

            {/* Y-Axis */}
            <YAxis
              stroke="#000"
              strokeWidth={1}
              tick={{ 
                fill: "#000", 
                fontWeight: "bold", 
                fontSize: "10px" 
              }}
              domain={[0, maxscore + 100]}
            />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                border: "2px solid #000",
                borderRadius: "5px",
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
                fontSize: "14px",
                paddingTop: "5px",
              }}
            />

            {/* Line */}
            <Line
              type="monotone"
              dataKey="score"
              stroke="#000"
              strokeWidth={2}
              dot={{ fill: "#FF6347", r: 3 }}
              activeDot={{ r: 6, stroke: "#FF6347", strokeWidth: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Container */}
      <div className="flex flex-row justify-between  text-center bg-gray-900 border border-gray-400 p-2 md:p-2 sm:pl-6 rounded-lg mt-4 sm:mt-6 shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
        <div className="flex  md:items-center mb-2 sm:mb-0 sm:mr-8">
          <i className="fas fa-trophy text-gray-400 mr-2 text-sm sm:text-base"></i>
          <span className="text-gray-400 mr-2 font-bold  text-sm sm:text-base">
            Max score:
          </span>
          <span className="text-white font-bold  text-sm sm:text-base">
            {maxscore}
          </span>
        </div>
        <div className="flex items-center">
          <i className="fas fa-trophy text-gray-400 mr-2 text-sm sm:text-base"></i>
          <span className="text-gray-400 mr-2 font-bold text-sm sm:text-base">
            Min score:
          </span>
          <span className="text-white font-bold  text-sm sm:text-base">
            {minscore}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressGraph;
