import { useDashboardStore } from "../../hooks/useDashboardStore";
import { useStreakTheme } from "../../hooks/useStreakTheme";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GlassCardSkeleton from "../skeleton/GlassCardSkeleton";

export default function DailyProgressBar() {
  const { precetage, remainingTo70, isLoading } = useDashboardStore();
  const theme = useStreakTheme();

  if (isLoading) {
    return (
      <GlassCardSkeleton className="items-center justify-center w-full">
        <div className="flex items-center justify-center py-4">
          <Skeleton circle width={140} height={140} />
        </div>
        <div className="flex justify-center">
          <Skeleton width={120} height={24} borderRadius={20} />
        </div>
      </GlassCardSkeleton>
    );
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const safePercentage = isNaN(precetage) ? 0 : Math.min(precetage, 100);
  const strokeDashoffset =
    circumference - (safePercentage / 100) * circumference;

  return (
    <div className="glass-card flex flex-col items-center justify-center p-4 w-full">
      <div className="flex items-center gap-3 w-full mb-4">
        <div
          className={`${theme.gradientBg} p-2 rounded-xl shadow-md ${theme.shadow}`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <div>
          <h3 className="text-gray-700 text-base sm:text-lg font-bold">
            Daily Streak
          </h3>
          <h5 className="text-[11px] text-gray-400">Keep the Momentum going</h5>
        </div>
      </div>

      <div className="relative flex items-center justify-center flex-1 w-full">
        <svg className="transform -rotate-90 w-32 h-32 sm:w-40 sm:h-40">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-gray-100"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-out ${
              safePercentage >= 70 ? theme.progressVivid : theme.progressFaded
            }`}
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            {Math.round(safePercentage)}%
          </span>
          <span className="text-[11px] text-gray-400 mt-0.5 font-medium">
            Completed
          </span>
        </div>
      </div>

      <div className="text-center mt-2">
        {typeof remainingTo70 === "number" && remainingTo70 > 0 ? (
          <p
            className={`text-xs font-semibold ${theme.badgeText} ${theme.accentLight} px-3 py-1 rounded-full`}
          >
            {Math.ceil(remainingTo70)}% more to keep streak
          </p>
        ) : typeof remainingTo70 === "string" && remainingTo70 === "Selesai" ? (
          <p
            className={`text-xs font-semibold ${theme.progressBadgeVivid} px-3 py-1 rounded-full`}
          >
            Streak Secured!
          </p>
        ) : (
          <p className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
            Tidak ada habit hari ini
          </p>
        )}
      </div>
    </div>
  );
}
