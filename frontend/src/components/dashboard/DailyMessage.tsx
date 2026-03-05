import { useDashboardStore } from "../../hooks/useDashboardStore";
import { useStreakTheme } from "../../hooks/useStreakTheme";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUsersStore } from "../../hooks/useUsersStore";

export default function DailyMessage() {
  const { isLoading } = useDashboardStore();
  const { name } = useUsersStore();
  const theme = useStreakTheme();
  const hari = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const Witchday = new Date().getDay();

  const dailyQuotes = [
    "Time to rest and reflect for the week ahead!",
    "A brand new week! Let's start strong with good habits.",
    "Stay focused and keep your streak alive today!",
    "Midweek already — don't lose momentum!",
    "The weekend is almost here. Let's finish your goals strong.",
    "Happy Friday! Complete your habits before you unwind.",
    "The weekend is here! Don't forget to keep up your daily habits.",
  ];

  if (isLoading) {
    return (
      <div className="glass-card relative overflow-hidden px-5 py-4 sm:px-6 sm:py-5">
        <div className="pl-3">
          <Skeleton width={250} height={22} />
          <Skeleton width={320} height={14} style={{ marginTop: 6 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card relative overflow-hidden px-5 py-4 sm:px-6 sm:py-5">
      {/* Accent bar */}
      <div
        className={`absolute top-0 left-0 w-1 h-full bg-linear-to-b ${theme.gradient} rounded-l-xl`}
      />

      <div className="pl-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-0.5">
          Happy {hari[Witchday]},{" "}
          <span className={theme.primary}>{name || "Sobat"}</span>!
        </h2>
        <p className="text-sm text-gray-500 font-medium">
          {dailyQuotes[Witchday]}
        </p>
      </div>
    </div>
  );
}
