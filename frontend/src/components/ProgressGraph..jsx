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
      className="ml-14 mr-14 mt-6 mb-8 pt-4 pr-4 rounded-xl"
    >
      <ResponsiveContainer width="100%" height={330}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
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
              fontSize: "24px",
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
    <div className="ml-14 mr-14 mb-14 flex text-center bg-black border border-1 border-white p-3 pl-8 rounded-lg mt-6 shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
    <div className="flex items-center mr-8">
      <i className="fas fa-trophy text-green-500 mr-2 mt-1"></i>
      <span className="text-white mr-2 font-extrabold">Maximum score:</span>
      <span className="text-green-500 font-extrabold">{maxscore}</span>
    </div>
    <div className="flex items-center">
      <i className="fas fa-trophy text-red-500 mr-2 mt-1"></i>
      <span className="text-white mr-2 font-extrabold">Minimum score</span>
      <span className="text-red-500 font-extrabold">{minscore}</span>
    </div>
  </div>
  </>
  );
};

export default ProgressGraph;
