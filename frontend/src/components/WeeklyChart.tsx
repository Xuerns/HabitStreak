import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";
import { useDashboardStore } from "../hooks/useDashboardStore";

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
    <ResponsiveContainer>
      <BarChart data={weeklyChart} className="pb-3">
        <Tooltip />
        <Bar dataKey="total" radius={[4, 4, 0, 0]}>
          {weeklyChart.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
        <XAxis dataKey="day" />
      </BarChart>
    </ResponsiveContainer>
  );
}
