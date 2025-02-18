import React, { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { TagDistribution } from "@/store/atoms";
import { useRecoilValue } from "recoil";
// import { UserCheck } from "lucide-react";

const PieChartComponent: React.FC = () => {
  const tags_data = useRecoilValue(TagDistribution);
  useEffect(()=>{
    console.log(`tagsData : `,tags_data);
  })
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
      {/* Pie Chart */}
      <PieChart width={400} height={400}>
        <Pie data={tags_data} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value">
          {tags_data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Explicit Legend */}
      <div className="flex flex-col border p-4 rounded-lg shadow-md">
        <h2 className="font-bold text-lg mb-2">Tags Solved</h2>
        <ul className="overflow-auto h-64">
          {tags_data.map((entry, index) => (
            <li key={index} className="flex items-center gap-2">
              <span style={{ backgroundColor: entry.color }} className="w-4 h-4 inline-block"></span>
              {entry.name} : {entry.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PieChartComponent;
  // const data = [
  //   { name: "math", value: 145, color: "#FF9999" },
  //   { name: "implementation", value: 145, color: "#FF66B2" },
  //   { name: "greedy", value: 113, color: "#C700C7" },
  //   { name: "brute force", value: 73, color: "#8884d8" },
  //   { name: "constructive algorithms", value: 52, color: "#66B3FF" },
  //   { name: "strings", value: 38, color: "#99FF99" },
  //   { name: "sortings", value: 32, color: "#FFD700" },
  //   { name: "number theory", value: 25, color: "#00FF99" },
  //   { name: "binary search", value: 19, color: "#33CCCC" },
  //   { name: "dp", value: 17, color: "#FF6600" },
  //   { name: "games", value: 9, color: "#660099" },
  //   { name: "data structures", value: 7, color: "#FF3366" },
  //   { name: "two pointers", value: 6, color: "#FF9933" },
  //   { name: "bitmasks", value: 6, color: "#CC99FF" },
  //   { name: "combinatorics", value: 5, color: "#999966" },
  //   { name: "geometry", value: 4, color: "#669999" },
  //   { name: "graph matchings", value: 3, color: "#FF5050" },
  // ];
