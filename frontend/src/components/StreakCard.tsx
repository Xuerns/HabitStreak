import { useDashboardStore } from "../hooks/useDashboardStore";
import { FireIcon } from "./FireIcon";
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
      color: "text-amber-400",
      background: "bg-amber-100",
      fill: "fill-amber-400",
    },
    2: {
      color: "text-amber-600",
      background: "bg-orange-200",
      fill: "fill-orange-600",
    },
    3: {
      color: "text-orange-500",
      background: "bg-orange-300",
      fill: "fill-orange-700",
    },
    4: {
      color: "text-red-600",
      background: "bg-red-200",
      fill: "fill-red-700",
    },
    5: {
      color: "text-pink-700",
      background: "bg-fuchsia-200",
      fill: "fill-violet-600",
    },
    6: {
      color: "text-violet-800",
      background: "bg-violet-200",
      fill: "fill-violet-800",
    },
  };
  const LevelColor = levelStyles[streakLevel];

  return (
    <div
      className={`flex flex-col gap-1 ${LevelColor.background} shadow-sm rounded-md p-2 shrink-0`}
    >
      <span className="flex items-center justify-center gap-2">
        <FaFire className={`w-5 h-5 ${LevelColor.fill}`} />
        <h3 className="text-xl font-bold text-gray-700">Streak</h3>
      </span>
      <div className="flex flex-col justify-center items-center">
        <FireIcon level={streakLevel} className="h-16 w-16" />
      </div>
      <div className="flex flex-col items-center">
        <span className={`text-2xl font-bold ${LevelColor.color}`}>
          {currentStreak}
        </span>
        <span className="text-xs font-bold text-gray-700">Days</span>
      </div>
    </div>
  );
}
