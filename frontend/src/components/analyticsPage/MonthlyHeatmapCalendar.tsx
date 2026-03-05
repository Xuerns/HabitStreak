import { useMemo } from "react";
import { useAnalyticsStore } from "../../hooks/useAnalyticsStore";
import {
  IoCalendarOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import { useStreakTheme } from "../../hooks/useStreakTheme";
import GlassCardSkeleton from "../skeleton/GlassCardSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthlyHeatmapCalendar() {
  const {
    monthlyHeatMap,
    fetchAnalytics,
    currentMonth: storeMonth,
    isLoading,
  } = useAnalyticsStore();
  const theme = useStreakTheme();

  // Derive year and month from store's currentMonth ("YYYY-MM" format)
  const [currentYear, currentMonth] = useMemo(() => {
    const [y, m] = storeMonth.split("-").map(Number);
    return [y, m];
  }, [storeMonth]);

  // Navigasi bulan
  const goToPrevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    fetchAnalytics(
      undefined,
      `${newYear}-${String(newMonth).padStart(2, "0")}`,
    );
  };

  const goToNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    fetchAnalytics(
      undefined,
      `${newYear}-${String(newMonth).padStart(2, "0")}`,
    );
  };

  const monthName = new Date(currentYear, currentMonth - 1).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    },
  );

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth - 1, 1);
    const lastDay = new Date(currentYear, currentMonth, 0).getDate();
    const startDow = firstDay.getDay(); // 0 = Sunday

    // Map heatmap data to dict
    const heatmapDict: Record<string, number> = {};
    (monthlyHeatMap ?? []).forEach((item) => {
      heatmapDict[item.date] = item.count;
    });

    const cells: {
      date: string;
      day: number;
      count: number;
      isEmpty: boolean;
    }[] = [];

    // Empty cells sebelum hari pertama
    for (let i = 0; i < startDow; i++) {
      cells.push({ date: "", day: 0, count: 0, isEmpty: true });
    }

    // Actual days
    for (let d = 1; d <= lastDay; d++) {
      const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({
        date: dateStr,
        day: d,
        count: heatmapDict[dateStr] || 0,
        isEmpty: false,
      });
    }

    return cells;
  }, [currentYear, currentMonth, monthlyHeatMap]);

  // Max untuk normalisasi warna
  const maxCount = useMemo(() => {
    return Math.max(
      1,
      ...calendarDays.filter((c) => !c.isEmpty).map((c) => c.count),
    );
  }, [calendarDays]);

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-100";
    const ratio = count / maxCount;
    if (ratio <= 0.25) return theme.heatmapColors[0];
    if (ratio <= 0.5) return theme.heatmapColors[1];
    if (ratio <= 0.75) return theme.heatmapColors[2];
    return theme.heatmapColors[3];
  };

  const getTextColor = (count: number) => {
    if (count === 0) return "text-gray-400";
    const ratio = count / maxCount;
    if (ratio <= 0.5) return theme.primaryDark;
    return "text-white";
  };

  // Cek apakah hari ini
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  if (isLoading) {
    return (
      <GlassCardSkeleton className="h-full sm:p-5">
        {/* Month navigator skeleton */}
        <div className="flex items-center justify-between px-2 mb-2">
          <Skeleton width={28} height={28} borderRadius={8} />
          <Skeleton width={120} height={16} />
          <Skeleton width={28} height={28} borderRadius={8} />
        </div>
        {/* Day labels */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAY_LABELS.map((day) => (
            <div
              key={day}
              className="text-[10px] font-medium text-gray-400 text-center"
            >
              {day}
            </div>
          ))}
        </div>
        {/* Calendar grid skeleton */}
        <div className="grid grid-cols-7 gap-1 flex-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton key={i} borderRadius={12} style={{ aspectRatio: "1" }} />
          ))}
        </div>
      </GlassCardSkeleton>
    );
  }

  return (
    <div className="glass-card flex flex-col p-4 sm:p-5 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className={`${theme.gradientBg} p-2.5 rounded-xl shadow-md ${theme.shadow}`}
          >
            <IoCalendarOutline className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-gray-800 text-lg font-bold">Monthly Heatmap</h3>
            <p className="text-[11px] text-gray-500 font-medium">
              Activity calendar view
            </p>
          </div>
        </div>
      </div>

      {/* Month Navigator */}
      <div className="flex items-center justify-between mb-4 px-2">
        <button
          onClick={goToPrevMonth}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
        >
          <IoChevronBack className="w-4 h-4 text-gray-600" />
        </button>
        <span className="text-sm font-bold text-gray-700">{monthName}</span>
        <button
          onClick={goToNextMonth}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
        >
          <IoChevronForward className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_LABELS.map((day) => (
          <div
            key={day}
            className="text-[10px] font-medium text-gray-400 text-center"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 flex-1">
        {calendarDays.map((cell, idx) =>
          cell.isEmpty ? (
            <div key={`empty-${idx}`} />
          ) : (
            <div
              key={cell.date}
              title={`${cell.date}: ${cell.count} habits completed`}
              className={`
                relative aspect-square rounded-xl flex items-center justify-center
                text-xs font-bold transition-all duration-200
                hover:ring-2 ${theme.hoverRing} hover:ring-offset-1 hover:scale-105 cursor-pointer shadow-sm
                ${getColor(cell.count)}
                ${getTextColor(cell.count)}
                ${cell.date === today ? `ring-2 ${theme.ring} ring-offset-2 opacity-100` : "opacity-90"}
              `}
            >
              {cell.day}
              {cell.count > 0 && (
                <span
                  className={`absolute -top-1.5 -right-1.5 w-4 h-4 ${theme.primaryBg} text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-sm border-2 border-white`}
                >
                  {cell.count}
                </span>
              )}
            </div>
          ),
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-auto pt-4 text-[10px] text-gray-400 font-medium justify-end">
        <span>Less</span>
        <div className="w-3.5 h-3.5 rounded-sm bg-gray-100" />
        <div className={`w-3.5 h-3.5 rounded-sm ${theme.heatmapColors[0]}`} />
        <div className={`w-3.5 h-3.5 rounded-sm ${theme.heatmapColors[1]}`} />
        <div className={`w-3.5 h-3.5 rounded-sm ${theme.heatmapColors[2]}`} />
        <div className={`w-3.5 h-3.5 rounded-sm ${theme.heatmapColors[3]}`} />
        <span>More</span>
      </div>
    </div>
  );
}
