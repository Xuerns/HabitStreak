import { useEffect } from "react";
import { useAnalyticsStore } from "../hooks/useAnalyticsStore";
import SummaryStatsCards from "../components/analyticsPage/SummaryStatsCards";
import CompletionTrendChart from "../components/analyticsPage/CompletionTrendChart";
import MonthlyHeatmapCalendar from "../components/analyticsPage/MonthlyHeatmapCalendar";
import PerHabitRateChart from "../components/analyticsPage/PerHabitRateChart";
import { useStreakTheme } from "../hooks/useStreakTheme";

export default function AnalyticsPage() {
  const { fetchAnalytics, isLoading, completionTrend } = useAnalyticsStore();
  const theme = useStreakTheme();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Only show full-page spinner on initial load (no data yet)
  if (isLoading && completionTrend.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-60px)]">
        <div className="flex flex-col items-center gap-3">
          <div
            className={`w-8 h-8 border-3 ${theme.border} border-t-transparent rounded-full animate-spin`}
          />
          <p className="text-sm text-gray-500 font-medium">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 flex flex-col gap-3 h-[calc(100vh-60px)] max-[1800px]:px-5">
      {/* Row 1: Summary Stats Cards */}
      <div className="shrink-0">
        <SummaryStatsCards />
      </div>

      {/* Row 2: Completion Trend + Monthly Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3 shrink-0 min-h-75 lg:min-h-90">
        <CompletionTrendChart />
        <MonthlyHeatmapCalendar />
      </div>

      {/* Row 3: Per Habit Rate */}
      <div className="flex-1 min-h-75">
        <PerHabitRateChart />
      </div>
    </div>
  );
}
