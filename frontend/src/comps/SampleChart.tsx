// "use client"

// import { Bar, BarChart , CartesianGrid,XAxis} from "recharts"
// import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// import { ChartConfig, ChartContainer } from "@/components/ui/chart"

// const chartData = [
//   { month: "January", problems_solved: 186, total_time_spent: 80 },
//   { month: "February", problems_solved: 305, total_time_spent: 200 },
//   { month: "March", problems_solved: 237, total_time_spent: 120 },
//   { month: "April", problems_solved: 73, total_time_spent: 190 },
//   { month: "May", problems_solved: 209, total_time_spent: 130 },
//   { month: "June", problems_solved: 214, total_time_spent: 140 },
// ]

// const chartConfig = {
//   problems_solved: {
//     label: "problems_solved",
//     color: "#2563eb",
//   },
//   total_time_spent: {
//     label: "total_time_spent",
//     color: "#60a5fa",
//   },
// } satisfies ChartConfig

// export function SampleChart() {
//   return (
//     <ChartContainer config={chartConfig} className="min-h-[50px] w-full">
//     <BarChart accessibilityLayer data={chartData}>
//       <CartesianGrid vertical={false} />
//       <XAxis
//       dataKey="month"
//       tickLine={false}
//       tickMargin={10}
//       axisLine={false}
//       tickFormatter={(value) => value.slice(0, 3)}
//     />
//       <ChartTooltip content={<ChartTooltipContent />} />
//       <Bar dataKey="problems_solved" fill="var(--color-problems_solved)" radius={4} />
//       <Bar dataKey="total_time_spent" fill="var(--color-total_time_spent)" radius={4} />
//     </BarChart>
//   </ChartContainer>
//   )
// }

"use client"
// import axios from "axios"
import { useEffect } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ProblemsByDate } from "@/store/atoms"
import { useRecoilValue } from "recoil"
const chartConfig = {
  problems_solved: {
    label: "problems_solved",
    color: "#2563eb",
  },
  total_minutes: {
    label: "total_minutes",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function SampleChart() {
  // const [chartData, setChartData] = useState<{ month: string; problems_solved: number; total_time_spent: number }[]>([])
  const probs_date_data = useRecoilValue(ProblemsByDate);
  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const response = await axios.get("http://localhost:3000/prtracks/getBydate") // Replace with your actual endpoint
    //     const data = response.data
    
    //     const groupedData: Record<string, { problems_solved: number; total_time_spent: number }> = {}
    //     console.log(`problems by date : `,JSON.stringify(data))
    
    //     data.tracks.forEach((track: any) => {
    //       const date = new Date(track.createdAt)
    //       const month = date.toLocaleString("en-US", { month: "long" })
    
    //       if (!groupedData[month]) {
    //         groupedData[month] = { problems_solved: 0, total_time_spent: 0 }
    //       }
    
    //       groupedData[month].problems_solved += track._count.id
    //       groupedData[month].total_time_spent += track._sum.timeTakenMinutes
    //     })
    
    //     const formattedChartData = Object.entries(groupedData).map(([month, values]) => ({
    //       month,
    //       problems_solved: values.problems_solved,
    //       total_time_spent: values.total_time_spent,
    //     }))
    
    //     setChartData(formattedChartData)
    //   } catch (error) {
    //     console.error("Error fetching data:", error)
    //   }
    // }

    // fetchData()
    console.log(`probs_date_data : `,probs_date_data);
  }, [])

  return (
    <ChartContainer config={chartConfig} className="min-h-[50px] w-full">
      <BarChart accessibilityLayer data={probs_date_data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="problems_solved" fill="var(--color-problems_solved)" radius={4} />
        <Bar dataKey="total_minutes" fill="var(--color-total_minutes)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
