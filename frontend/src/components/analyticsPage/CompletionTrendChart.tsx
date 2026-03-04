import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAnalyticsStore } from "../../hooks/useAnalyticsStore";
import { IoTrendingUp } from "react-icons/io5";
import { useStreakTheme } from "../../hooks/useStreakTheme";

const PERIOD_OPTIONS = [
  { label: "7D", value: 7 },
  { label: "14D", value: 14 },
  { label: "30D", value: 30 },
];

export default function CompletionTrendChart() {
  const { completionTrend, fetchAnalytics, currentPeriod } =
    useAnalyticsStore();
  const theme = useStreakTheme();

  const handlePeriodChange = (period: number) => {
    fetchAnalytics(period, undefined);
  };

  // Format tanggal agar lebih singkat di X-axis
  const formattedData = completionTrend.map((item) => ({
    ...item,
    shortDate: new Date(item.date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    }),
  }));

  return (
    <div className="glass-card flex flex-col h-full min-h-0 overflow-hidden p-4 sm:p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`${theme.gradientBg} p-2.5 rounded-xl shadow-md ${theme.shadow}`}
          >
            <IoTrendingUp className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h3 className="text-gray-800 text-lg font-bold">
              Completion Trend
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">
              Daily habit completions over time
            </p>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-1 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200/50">
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handlePeriodChange(opt.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                currentPeriod === opt.value
                  ? `bg-white ${theme.primary} shadow-sm border border-gray-200/50`
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0 w-full relative">
        {formattedData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 font-semibold text-sm">
              No data available for this period
            </p>
          </div>
        ) : (
          <div className="absolute inset-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={formattedData}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorCompleted"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={theme.primaryHex}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={theme.primaryHex}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="shortDate"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                  labelFormatter={(label) => ` ${label}`}
                  formatter={(value: number | undefined) => [
                    <span className={`font-semibold ${theme.primary}`}>
                      {value ?? 0} habits
                    </span>,
                    <span className="text-gray-500">Completed</span>,
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke={theme.primaryHex}
                  strokeWidth={3}
                  fill="url(#colorCompleted)"
                  dot={false}
                  activeDot={{
                    r: 6,
                    stroke: theme.primaryHex,
                    strokeWidth: 2,
                    fill: "white",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
