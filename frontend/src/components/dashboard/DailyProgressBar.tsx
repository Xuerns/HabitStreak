import { RiFireLine } from "react-icons/ri";
import { useDashboardStore } from "../../hooks/useDashboardStore";

export default function DailyProgressBar() {
  const { precetage, remainingTo70 } = useDashboardStore();

  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  // Mencegah NaN jika belum ada habit (habistotalToday = 0)
  const safePercentage = isNaN(precetage) ? 0 : Math.min(precetage, 100);
  const strokeDashoffset =
    circumference - (safePercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full  bg-white rounded-md shadow-sm border border-gray-200">
      <div className="flex items-center gap-5 w-full mb-4">
        <div className="bg-amber-400 p-2 rounded shadow-sm shadow-amber-300">
          <RiFireLine className="w-6 h-6 fill-white" />
        </div>
        <div>
          <h3 className="text-gray-700 text-xl font-bold  ">Daily Streak</h3>
          <h5 className="text-xs text-gray-500">Keep the Momentum going</h5>
        </div>
      </div>

      <div className="relative flex items-center justify-center flex-1 w-full">
        <svg className="transform -rotate-90 w-40 h-40">
          {/* Background Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-gray-100"
          />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-out ${
              safePercentage >= 70 ? "text-green-500" : "text-amber-500"
            }`}
          />
        </svg>

        {/* Text didalan progres bar */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-gray-800">
            {Math.round(safePercentage)}%
          </span>
          <span className="text-xs text-gray-500 mt-1 font-medium">
            Completed
          </span>
        </div>
      </div>

      <div className=" text-center">
        {typeof remainingTo70 === "number" && remainingTo70 > 0 ? (
          <p className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            {Math.ceil(remainingTo70)}% more to keep streak
          </p>
        ) : typeof remainingTo70 === "string" && remainingTo70 === "Selesai" ? (
          <p className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            Streak Secured!
          </p>
        ) : (
          <p className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
            Tidak ada habit hari ini
          </p>
        )}
      </div>
    </div>
  );
}
