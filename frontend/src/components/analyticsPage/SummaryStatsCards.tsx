import { useAnalyticsStore } from "../../hooks/useAnalyticsStore";
import {
  IoFlame,
  IoCalendar,
  IoCheckmarkCircle,
  IoList,
  IoStar,
} from "react-icons/io5";

const STAT_CONFIG = [
  {
    key: "currentStreak" as const,
    label: "Current Streak",
    icon: IoFlame,
    suffix: " days",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    key: "totalDaysTracked" as const,
    label: "Days Tracked",
    icon: IoCalendar,
    suffix: " days",
    gradient: "from-amber-300 to-amber-500",
  },
  {
    key: "overall" as const,
    label: "Total Completed",
    icon: IoCheckmarkCircle,
    suffix: "",
    gradient: "from-yellow-400 to-amber-500",
  },
  {
    key: "totalHabits" as const,
    label: "Total Habits",
    icon: IoList,
    suffix: "",
    gradient: "from-orange-400 to-amber-600",
  },
  {
    key: "perfect" as const,
    label: "Perfect Days",
    icon: IoStar,
    suffix: " days",
    gradient: "from-amber-400 to-yellow-500",
  },
];

export default function SummaryStatsCards() {
  const { summaryStats } = useAnalyticsStore();

  return (
    <div className="grid grid-cols-5 gap-3">
      {STAT_CONFIG.map((stat) => {
        const Icon = stat.icon;
        const value = summaryStats[stat.key];

        return (
          <div
            key={stat.key}
            className={`relative overflow-hidden rounded-xl bg-linear-to-br ${stat.gradient} p-4 text-white shadow-md hover:shadow-lg transition-shadow duration-300 group`}
          >
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/5 rounded-full" />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-white/80 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
              <p className="text-2xl font-bold">
                {value}
                <span className="text-sm font-normal text-white/70">
                  {stat.suffix}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
