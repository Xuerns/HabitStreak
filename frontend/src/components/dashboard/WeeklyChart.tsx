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

export default function WeeklyChart() {
  const { weeklyChart } = useDashboardStore();
  const theme = useStreakTheme();

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
