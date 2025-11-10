
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
  const probs_date_data = useRecoilValue(ProblemsByDate);
  useEffect(() => {
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
