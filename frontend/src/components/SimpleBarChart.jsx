import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SimpleBarChart = ({ data }) => {


  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-xl font-bold text-white mb-4">
        Games <span className="text-red-500">Won</span> Per Level
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 30, left: 10, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis
            dataKey="name"
            axisLine={{ stroke: "#FFFFFF" }}
            tickLine={false}
            tick={{ fill: "#FFFFFF", fontSize: 12 }}
          />
          <YAxis
            axisLine={{ stroke: "#FFFFFF" }}
            tickLine={false}
            tick={{ fill: "#FFFFFF", fontSize: 12 }}
          />
          <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.2)" }} />
          <Bar dataKey="wins" fill="#4F46E5" radius={[4, 4, 0, 0]} animationDuration={1500} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
  
};
export default SimpleBarChart;
