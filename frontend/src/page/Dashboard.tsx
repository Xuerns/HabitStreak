import { useEffect } from "react";
import { fetchApi } from "../service/fetchApi";
import DashboardCard from "../components/DashboardCard";
import DailyMessage from "../components/DailyMessage";
import { useDashboardStore } from "../hooks/useDashboardStore";

export default function Dashboard() {
  const {
    currentStreak,
    longestStreak,
    totalHabit,
    precetage,
    remainingTo70,
    setCurrentStreak,
    setLongestStreak,
    setTotalHabit,
    setPrecentage,
    setRemainingTo70,
  } = useDashboardStore();

  const getDashboard = async () => {
    const data = await fetchApi.getDashboard();
    setCurrentStreak(data.streak)
    setLongestStreak(data.longestStreak)
    setTotalHabit(data.totalHabit)
    setPrecentage(data.precentage)
    setRemainingTo70(data.remainingTo70)
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div className="px-1 flex flex-col gap-3">
      <div>
        <h1 className="text-3xl py-3 font-bold">Dashboard</h1>
        <div className="grid grid-cols-5 gap-2 text-white">
          <DashboardCard data={currentStreak} label="Streak" type="normal" />
          <DashboardCard
            data={longestStreak}
            label="Longest Streak"
            type="normal"
          />
          <DashboardCard data={totalHabit} label="Total Habit" type="normal" />
          <DashboardCard
            data={precetage}
            label="Precentage"
            type="precentage"
          />
          <DashboardCard
            data={remainingTo70}
            label="Remaining to 70%"
            type="precentage"
          />
        </div>
      </div>
      <DailyMessage />
    </div>
  );
}
