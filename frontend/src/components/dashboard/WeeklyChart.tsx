import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";
import { useDashboardStore } from "../../hooks/useDashboardStore";
import { useStreakTheme } from "../../hooks/useStreakTheme";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WeeklyChart() {
  const { weeklyChart, isLoading } = useDashboardStore();
  const theme = useStreakTheme();

  if (isLoading) {
    return (
      <div className="flex items-end justify-between gap-2 w-full h-full px-2 pb-4">
        {[65, 45, 80, 30, 55, 70, 40].map((height, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <Skeleton
              width="100%"
              height={`${height}%`}
              borderRadius={6}
              style={{ minHeight: height * 1.5 }}
            />
            <Skeleton width={20} height={10} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={weeklyChart} className="pb-2">
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            fontSize: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        />
        <Bar dataKey="total" radius={[6, 6, 0, 0]}>
          {weeklyChart.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={theme.chartBarColors[index % theme.chartBarColors.length]}
            />
          ))}
        </Bar>
        <XAxis
          dataKey="day"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
