import { useEffect, useState } from "react";
import { fetchApi } from "../service/fetchApi";
import DashboardCard from "../components/DashboardCard";
import DailyMessage from "../components/DailyMessage";

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
    <div className="px-1 flex flex-col gap-3">
      <div>
        <h1 className="text-3xl py-3 font-bold">Dashboard</h1>
        <div className="grid grid-cols-5 gap-2 text-white">
          <DashboardCard data={all.streak} label="Streak" type="normal" />
          <DashboardCard
            data={all.longestStreak}
            label="Longest Streak"
            type="normal"
          />
          <DashboardCard
            data={all.totalHabit}
            label="Total Habit"
            type="normal"
          />
          <DashboardCard
            data={all.precentage}
            label="Precentage"
            type="precentage"
          />
          <DashboardCard
            data={all.remainingTo70}
            label="Remaining to 70%"
            type="precentage"
          />
        </div>
      </div>
      <DailyMessage />
    </div>
  );
}
