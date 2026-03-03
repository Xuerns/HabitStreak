import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";
import { useDashboardStore } from "../../hooks/useDashboardStore";

const COLORS = [
  "oklch(92.4% 0.12 95.746)",
  "oklch(87.9% 0.169 91.605)",
  "oklch(82.8% 0.189 84.429)",
  "oklch(76.9% 0.188 70.08)",
  "oklch(66.6% 0.179 58.318)",
  "oklch(55.5% 0.163 48.998)",
  "oklch(47.3% 0.137 46.201)",
];

export default function WeeklyChart() {
  const { weeklyChart } = useDashboardStore();

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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
