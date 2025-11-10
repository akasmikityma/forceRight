import React, { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { TagDistribution } from "@/store/atoms";
import { useRecoilValue } from "recoil";

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
