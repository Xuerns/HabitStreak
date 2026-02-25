import { useEffect } from "react";
import { fetchApi } from "../service/fetchApi";
import DashboardCard from "../components/DashboardCard";
import DailyMessage from "../components/DailyMessage";
import { useDashboardStore } from "../hooks/useDashboardStore";
import ActivityHeatmap from "../components/ActivityHeatmap";
import DailyProgressBar from "../components/DailyProgressBar";
import StreakCard from "../components/StreakCard";
import TodayHabits from "../components/TodayHabits";

export default function Dashboard() {
  const {
    currentStreak,
    longestStreak,
    totalHabit,
    topHabits,
    setCurrentStreak,
    setLongestStreak,
    setTotalHabit,
    setPrecentage,
    setRemainingTo70,
    setTodayHabits,
    setTopHabits,
    setHeatmap,
  } = useDashboardStore();

  const getDashboard = async () => {
    const data = await fetchApi.getDashboard();
    setCurrentStreak(data.streak);
    setLongestStreak(data.longestStreak);
    setTotalHabit(data.totalHabit);
    setPrecentage(data.precentage);
    setRemainingTo70(data.remainingTo70);
    setTodayHabits(data.todayHabits);
    setTopHabits(data.topHabits);
    setHeatmap(data.heatmap);
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div className="px-1 py-3 flex flex-col gap-3 h-[calc(100vh-60px)] overflow-hidden">
      {/* Grid Utama */}
      <div className="grid grid-cols-[8fr_2fr] gap-3 flex-1 min-h-0">
        {/* Container 1 (Kiri) */}
        <div className="flex flex-col gap-2 text-white px-2 min-h-0">
          <div className="text-black">
            <DailyMessage />
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 gap-2">
            <DashboardCard data={currentStreak} label="Streak" type="normal" />
            <DashboardCard
              data={longestStreak}
              label="Longest Streak"
              type="normal"
            />
            <DashboardCard
              data={totalHabit}
              label="Total Habit"
              type="normal"
            />
          </div>

          {/* Activity & Progress Row */}
          <div className="w-full flex-1 min-h-0 text-black rounded grid grid-cols-[1fr_1.5fr] gap-2">
            <div className="flex flex-col gap-2 min-h-0">
              <ActivityHeatmap />
              <div className="flex-1 flex items-center justify-center bg-white border border-gray-200 rounded-md shadow-sm text-gray-400 font-medium min-h-0">
                Empty
              </div>
            </div>
            <div className="flex flex-col gap-2 min-h-0">
              <div className="grid grid-cols-2 gap-2">
                <DailyProgressBar />
                <div className="border border-gray-200 shadow-sm rounded-md p-3 h-full">
                  <h3 className="font-semibold mb-2 text-2xl border-b pb-1 border-b-gray-300">
                    Top 3 Habit
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {topHabits.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center bg-gray-50 border border-gray-300 p-2 rounded"
                      >
                        <span className="font-medium text-gray-700">
                          {item.title}
                        </span>
                        <span className="font-bold text-amber-500 text-lg">
                          {item.total_completed}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center w-full text-gray-400 font-medium bg-white rounded-md shadow-sm border border-gray-200 min-h-0">
                Empty
              </div>
            </div>
          </div>
        </div>
        {/* Container 2 (Kanan) */}
        <div className="flex flex-col gap-3 pr-1 min-h-0 overflow-hidden">
          {/* Today Habits */}
          <TodayHabits />

          {/* Streak */}
          <StreakCard />
        </div>
      </div>
    </div>
  );
}
