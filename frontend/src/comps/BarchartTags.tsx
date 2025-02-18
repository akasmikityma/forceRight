// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "math", time: 189 },
//   { name: "implementation", time: 18 },
//   { name: "greedy", time: 15 },
//   { name: "brute force", time: 12 },
//   { name: "constructive algorithms", time: 10 },
//   { name: "strings", time: 9 },
//   { name: "sortings", time: 8 },
//   { name: "number theory", time: 7 },
//   { name: "binary search", time: 6 },
//   { name: "dp", time: 5 },
//   { name: "games", time: 3 },
// ];

// const TimeSpentChart = () => {
//   return (
//     <div className="flex justify-center items-center w-full h-[400px] border p-6">
//       <ResponsiveContainer width="80%" height="100%">
//         <BarChart
//           data={data}
//           margin={{ top: 20, right: 20, left: 20, bottom: 60 }} // Adjusting margins
//         >
//           <XAxis
//             dataKey="name"
//             angle={-45}
//             textAnchor="end"
//             interval={0} // Ensures all labels are shown
//             height={80} // Extra space for long labels
//           />
//           <YAxis label={{ value: "Time (hours)", angle: -90, position: "insideLeft" }} />
//           <Tooltip />
//           <Bar dataKey="time" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default TimeSpentChart;
// still i can go for another approach >> and just need to push the code to make it live >> i can always make it more interactive making it 
// ai integrated and putting the codeforces api and stuff >> 

import React, { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { AverageTimePerTag } from "@/store/atoms";
import { useRecoilValue } from "recoil";
// const timeSpentData = [
//   { name: "math", time: 20, color: "#FF9999" },
//   { name: "implementation", time: 18, color: "#FF66B2" },
//   { name: "greedy", time: 15, color: "#C700C7" },
//   { name: "brute force", time: 12, color: "#8884d8" },
//   { name: "constructive algorithms", time: 10, color: "#66B3FF" },
//   { name: "strings", time: 9, color: "#99FF99" },
//   { name: "sortings", time: 8, color: "#FFD700" },
//   { name: "number theory", time: 7, color: "#00FF99" },
//   { name: "binary search", time: 6, color: "#33CCCC" },
//   { name: "dp", time: 5, color: "#FF6600" },
//   { name: "games", time: 3, color: "#660099" },
//   { name: "number theory", time: 7, color: "#00FF99" },
//   { name: "binary search", time: 6, color: "#33CCCC" },
//   { name: "dp", time: 5, color: "#FF6600" },
//   { name: "games", time: 3, color: "#660099" },
// ];

const CustomBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  return <rect x={x} y={y} width={width} height={height} fill={payload.color} />;
};

const BarChartComponent: React.FC = () => {
  const timeperTag = useRecoilValue(AverageTimePerTag);
  useEffect(()=>{
    console.log(`timePerTag`,timeperTag);
  })
  return (
    <div className="w-full max-w-6xl mx-auto mt-6 p-4 border items-center justify-center rounded-lg shadow-md">
          <h2 className="font-bold text-lg text-center mb-4">Time Spent on Each Tag</h2>
          <div>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart data={timeperTag} margin={{ top: 20, right: 50, left: 50, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-30} textAnchor="end" />
                <YAxis label={{ value: "avgTime", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                {/* Removed Legend */}
                    <Legend 
                    formatter={() => {
                        return ""; // Return an empty string to hide the text
                    }}
                />
                <Bar dataKey="avgTime" shape={<CustomBar />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
  );
};

export default BarChartComponent;

