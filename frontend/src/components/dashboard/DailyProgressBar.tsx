import { RiFireLine } from "react-icons/ri";
import { useDashboardStore } from "../../hooks/useDashboardStore";

export default function DailyProgressBar() {
  const { precetage, remainingTo70 } = useDashboardStore();

  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const safePercentage = isNaN(precetage) ? 0 : Math.min(precetage, 100);
  const strokeDashoffset =
    circumference - (safePercentage / 100) * circumference;

  return (
    <div className="glass-card flex flex-col items-center justify-center p-4 w-full">
      <div className="flex items-center gap-3 w-full mb-4">
        <div className="bg-linear-to-br from-amber-400 to-orange-500 p-2 rounded-xl shadow-md shadow-amber-500/20">
          <RiFireLine className="w-5 h-5 fill-white" />
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
              safePercentage >= 70 ? "text-green-500" : "text-amber-500"
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
          <p className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            {Math.ceil(remainingTo70)}% more to keep streak
          </p>
        ) : typeof remainingTo70 === "string" && remainingTo70 === "Selesai" ? (
          <p className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
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
