
import type React from "react"
import { PieChart, Pie, Cell } from "recharts"
import { useRecoilValue } from "recoil"
import { difficultyData } from "../store/atoms"
import { Skeleton } from "../components/ui/skeleton"

const DifficultyStats: React.FC = () => {
  const data_diff_status = useRecoilValue(difficultyData)
  const total = data_diff_status.reduce((sum, item) => sum + item.value, 0)
  const isLoading = data_diff_status.length === 0 // Check if data is still loading

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 relative py-3">
      {" "}
      {/* Added relative for absolute positioning of Skeleton */}
      {isLoading ? ( // Conditionally render Skeleton
        <div className="grid grid-cols-[auto_1fr] gap-4 w-full">
          {" "}
          {/* Grid Container */}
          <div className="relative h-24 w-24">
            {" "}
            {/* PieChart Skeleton */}
            <Skeleton className="h-full w-full rounded-full bg-gray-200 absolute inset-0" />
          </div>
          <div className="flex flex-col gap-2">
            {" "}
            {/* StatBoxes Skeletons */}
            <Skeleton className="h-8 w-full rounded-lg bg-gray-200" />
            <Skeleton className="h-8 w-full rounded-lg bg-gray-200" />
            <Skeleton className="h-8 w-full rounded-lg bg-gray-200" />
          </div>
        </div>
      ) : (
        <>
          {" "}
          {/* Render content when data is loaded */}
          {/* Circular Chart */}
          <div className="relative w-24 h-24">
            <PieChart width={96} height={96}>
              <Pie
                data={data_diff_status}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={40}
                paddingAngle={2}
                dataKey="value"
              >
                {data_diff_status.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={data_diff_status[index]?.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-black">{total}</div>
          </div>
          {/* Difficulty Stats */}
          <div className="flex flex-col gap-2">
            {data_diff_status.map((tr) => (
              <StatBox key={tr.name} label={tr.name} value={tr.value} color={tr.color} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Small stat box component
const StatBox: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className={`flex justify-between px-3 py-1 gap-1 bg-gray-100 rounded-lg ${color} text-gray-700`}>
    {" "}
    {/* Adjusted styling for StatBox */}
    <span className="font-medium text-sm">{label}</span> {/* Reduced font size */}
    <span className="text-sm">{value}</span> {/* Reduced font size */}
  </div>
)

export default DifficultyStats
