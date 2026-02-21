import { useEffect, useState } from "react";
import { fetchApi } from "../service/fetchApi";

interface Alltype {
  streak: number;
  longestStreak: number;
  totalHabit: number;
  precentage: number;
  remainingTo70: number;
}

export default function Dashboard() {
  const [all, setAll] = useState<Alltype>({
    streak: 0,
    longestStreak: 0,
    totalHabit: 0,
    precentage: 0,
    remainingTo70: 0,
  });

  const getDashboard = async () => {
    const data = await fetchApi.getDashboard();
    setAll(data);
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div className="px-1">
      <h1 className="text-3xl py-3 font-bold">Dashboard</h1>
      <div className="grid grid-cols-5 gap-2 text-white">
        <div className="bg-amber-400 rounded p-1">
          <h6 className="font-semibold">Streak</h6>
          <span>{all.streak}</span>
        </div>
        <div className="bg-amber-500 rounded p-1">
          <h6 className="font-semibold">Longest Streak</h6>
          <span>{all.longestStreak}</span>
        </div>
        <div className="bg-amber-600 rounded p-1">
          <h6 className="font-semibold">Total Habit</h6>
          <span>{all.totalHabit}</span>
        </div>
        <div className="bg-amber-700 rounded p-1">
          <h6 className="font-semibold">Precentage</h6>
          <span>{all.precentage} %</span>
        </div>
        <div className="bg-amber-800 rounded p-1">
          <h6 className="font-semibold">Remaining to 70%</h6>
          <span>{all.remainingTo70}</span>
        </div>
      </div>
    </div>
  );
}
