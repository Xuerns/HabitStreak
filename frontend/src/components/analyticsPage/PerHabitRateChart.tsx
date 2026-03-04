import { useMemo } from "react";
import { useAnalyticsStore } from "../../hooks/useAnalyticsStore";
import { IoBarChart } from "react-icons/io5";
import { useStreakTheme } from "../../hooks/useStreakTheme";

export default function PerHabitRateChart() {
  const { perHabitRate } = useAnalyticsStore();
  const theme = useStreakTheme();

  const habitsWithRate = useMemo(() => {
    return perHabitRate.map((habit) => ({
      ...habit,
      rate:
        habit.total_days > 0
          ? Math.round((habit.completed / habit.total_days) * 100)
          : 0,
    }));
  }, [perHabitRate]);

  const getBarColor = (rate: number) => {
    if (rate >= 80) return `bg-gradient-to-r ${theme.gradient}`;
    if (rate >= 60) return `bg-gradient-to-r ${theme.gradient}`;
    if (rate >= 40) return `${theme.accentMedium}`;
    if (rate >= 20) return `${theme.accentLight}`;
    return "bg-gradient-to-r from-gray-200 to-gray-300";
  };

  const getRateLabel = (rate: number) => {
    if (rate >= 80)
      return {
        text: "Excellent",
        color: `${theme.badgeText} ${theme.accentLight} border ${theme.border}`,
      };
    if (rate >= 60)
      return {
        text: "Good",
        color: `${theme.primary} ${theme.accentLight} border ${theme.border}`,
      };
    if (rate >= 40)
      return {
        text: "Fair",
        color: `${theme.badgeText} ${theme.accentLight} border ${theme.border}`,
      };
    return {
      text: "Needs Work",
      color: "text-gray-500 bg-gray-50 border border-gray-200",
    };
  };

  return (
    <div className="glass-card flex flex-col p-4 sm:p-5 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`${theme.gradientBg} p-2.5 rounded-xl shadow-md ${theme.shadow}`}
        >
          <IoBarChart className="w-5 h-5 fill-white" />
        </div>
        <div>
          <h3 className="text-gray-800 text-lg font-bold">
            Per Habit Completion Rate
          </h3>
          <p className="text-[11px] text-gray-500 font-medium">
            How consistent you are with each habit
          </p>
        </div>
      </div>

      {/* Habit Bars */}
      {habitsWithRate.length === 0 ? (
        <div className="flex items-center justify-center flex-1">
          <p className="text-gray-400 font-semibold text-sm">
            No habit data available
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1 overflow-y-auto [scrollbar-width:none] pr-2">
          {habitsWithRate.map((habit, index) => {
            const label = getRateLabel(habit.rate);
            return (
              <div
                key={habit.id}
                className="group hover:bg-white/60 hover:shadow-sm rounded-xl p-2.5 transition-all duration-200 border border-transparent hover:border-white/50"
              >
                {/* Habit info row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-xs font-black ${theme.primary} opacity-50 w-5`}
                    >
                      #{index + 1}
                    </span>
                    <span
                      className={`text-sm font-bold text-gray-700 ${theme.hoverText} transition-colors`}
                    >
                      {habit.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${label.color} shadow-sm`}
                    >
                      {label.text}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {habit.completed}/{habit.total_days} days
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-gray-100/80 rounded-full overflow-hidden shadow-inner flex items-center">
                    <div
                      className={`h-full rounded-full ${getBarColor(habit.rate)} transition-all duration-1000 ease-out`}
                      style={{ width: `${habit.rate}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-extrabold text-gray-600 w-9 text-right tabular-nums">
                    {habit.rate}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
