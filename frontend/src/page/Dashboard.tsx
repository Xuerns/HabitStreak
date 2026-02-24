import { useEffect } from "react";
import { fetchApi } from "../service/fetchApi";
import DashboardCard from "../components/DashboardCard";
import DailyMessage from "../components/DailyMessage";
import { useDashboardStore } from "../hooks/useDashboardStore";
import ActivityHeatmap from "../components/ActivityHeatmap";
import DailyProgressBar from "../components/DailyProgressBar";
import { FireIcon } from "../components/FireIcon";

export default function Dashboard() {
  const {
    currentStreak,
    longestStreak,
    totalHabit,
    todayHabits,
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
    <div className="px-1 py-3 flex flex-col gap-3 h-[calc(100vh-60px)]">
      {/* Grid Utama */}
      <div className="grid grid-cols-[8fr_2fr] gap-3 flex-1 min-h-0">
        {/* Container 1 (Kiri) */}
        <div className="flex flex-col gap-2 text-white px-2 h-full">
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
            <div className="flex flex-col gap-2 h-full min-h-0">
              <ActivityHeatmap />
              <div className="flex-1 flex items-center justify-center bg-white border border-gray-200 rounded-md shadow-sm text-gray-400 font-medium">
                Empty
              </div>
            </div>
            <div className="flex flex-col gap-2">
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

              <div className="flex-1 flex items-center justify-center w-full text-gray-400 font-medium bg-white rounded-md shadow-sm border border-gray-200">
                Empty
              </div>
            </div>
          </div>
        </div>
        {/* Container 2 (Kanan) */}
        <div className="flex flex-col gap-3 pr-1">
          {/* Today Habits */}
          <div className="border border-gray-200 shadow-sm rounded-md p-3 flex-1">
            <h3 className="font-semibold text-2xl pb-1 mb-2 border-b border-gray-300">
              Today Habit
            </h3>
            <ul>
              {todayHabits.map((item) => (
                <li key={item.id}>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Streak */}
          <div className="border border-gray-200 shadow-sm rounded-md p-2">
            <h3 className="text-2xl font-semibold">Streak</h3>
            <div className="flex flex-col justify-center items-center gap-2">
              <FireIcon level={1} className="h-30 w-30" />
              <span className="text-2xl font-bold text-amber-400">
                {currentStreak}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
