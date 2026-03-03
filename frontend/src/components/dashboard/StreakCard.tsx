import { useDashboardStore } from "../../hooks/useDashboardStore";
import { FireIcon } from "../FireIcon";
import { FaFire } from "react-icons/fa";

type level = 1 | 2 | 3 | 4 | 5 | 6;

export default function StreakCard() {
  const { currentStreak } = useDashboardStore();

  const levels: { min: number; level: level }[] = [
    { min: 200, level: 6 },
    { min: 100, level: 5 },
    { min: 50, level: 4 },
    { min: 20, level: 3 },
    { min: 10, level: 2 },
    { min: 1, level: 1 },
  ];

  const streakLevel: level =
    levels.find((level) => currentStreak >= level.min)?.level ?? 1;

  const levelStyles: Record<
    level,
    { color: string; background: string; fill: string }
  > = {
    1: {
      color: "text-amber-500",
      background: "bg-amber-50",
      fill: "fill-amber-400",
    },
    2: {
      color: "text-amber-600",
      background: "bg-orange-50",
      fill: "fill-orange-600",
    },
    3: {
      color: "text-orange-500",
      background: "bg-orange-100",
      fill: "fill-orange-700",
    },
    4: {
      color: "text-red-600",
      background: "bg-red-50",
      fill: "fill-red-700",
    },
    5: {
      color: "text-pink-700",
      background: "bg-fuchsia-50",
      fill: "fill-violet-600",
    },
    6: {
      color: "text-violet-800",
      background: "bg-violet-50",
      fill: "fill-violet-800",
    },
  };
  const LevelColor = levelStyles[streakLevel];

  return (
    <div
      className={`flex flex-col gap-3 ${LevelColor.background} rounded-2xl p-5 shrink-0 border border-white/40 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300 w-full min-h-40 h-full justify-center`}
    >

      <span className="flex items-center justify-center gap-2 relative z-10">
        <FaFire className={`w-5 h-5 ${LevelColor.fill}`} />
        <h3 className="text-lg font-bold text-gray-700">Current Streak</h3>
      </span>

      <div className="flex flex-col justify-center items-center relative z-10 my-2">
        <FireIcon
          level={streakLevel}
          className="h-16 w-16 group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col items-center relative z-10">
        <span
          className={`text-3xl font-black ${LevelColor.color} drop-shadow-sm`}
        >
          {currentStreak}
        </span>
        <span className="text-sm font-bold text-gray-500/80 uppercase tracking-wider mt-1">
          Days
        </span>
      </div>
    </div>
  );
}
