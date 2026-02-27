import { useEffect } from "react";
import { fetchApi } from "../service/fetchApi";
import DashboardCard from "../components/dashboard/DashboardCard";
import DailyMessage from "../components/dashboard/DailyMessage";
import { useDashboardStore } from "../hooks/useDashboardStore";
import ActivityHeatmap from "../components/dashboard/ActivityHeatmap";
import DailyProgressBar from "../components/dashboard/DailyProgressBar";
import StreakCard from "../components/dashboard/StreakCard";
import TodayHabits from "../components/dashboard/TodayHabits";
import TopHabits from "../components/dashboard/TopHabits";
import WeeklyChart from "../components/dashboard/WeeklyChart";
import { IoStatsChartSharp } from "react-icons/io5";
import LogActivity from "../components/dashboard/LogActivity";

export default function Dashboard() {
  const {
    currentStreak,
    longestStreak,
    totalHabit,
    setCurrentStreak,
    setLongestStreak,
    setTotalHabit,
    setPrecentage,
    setRemainingTo70,
    setTodayHabits,
    setTopHabits,
    setHeatmap,
    setWeeklyChart,
    setActivityLogs,
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
    setWeeklyChart(data.weeklyChart);
    setActivityLogs(data.activitylogs);
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
              label="Habit Completed"
              type="normal"
            />
          </div>

          {/* Activity & Progress Row */}
          <div className="w-full flex-1 min-h-0 text-black rounded grid grid-cols-[1fr_1.5fr] gap-2">
            <div className="flex flex-col gap-2 min-h-0">
              <ActivityHeatmap />
              <div className="flex-1 flex  bg-white border border-gray-200 rounded-md shadow-sm p-3 min-h-0">
                <LogActivity />
              </div>
            </div>
            <div className="flex flex-col gap-2 min-h-0">
              <div className="grid grid-cols-2 gap-2">
                {/*Progress*/}
                <DailyProgressBar />

                {/*Top Habit*/}
                <TopHabits />
              </div>

              <div className="flex-1 px-3 py-2 w-full text-gray-400 font-medium bg-white rounded-md shadow-sm border border-gray-200 min-h-0">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-400 p-1 rounded shadow-sm shadow-amber-300">
                    <IoStatsChartSharp className="fill-white" />
                  </div>
                  <h2 className="text-md text-gray-700">Weekly Chart</h2>
                </div>
                <WeeklyChart />
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
