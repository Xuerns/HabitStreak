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
import {
  IoStatsChartSharp,
  IoFlame,
  IoTrophy,
  IoCheckmarkCircle,
} from "react-icons/io5";
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
    <div className="flex flex-col gap-3 flex-1 h-auto lg:h-full lg:max-h-full max-[1800px]:px-5">
      {/* Scrollable upper section (Message, Stats, Heatmap, Progress, Top) */}
      <div className="flex-none flex flex-col gap-3">
        {/* Greeting */}
        <DailyMessage />

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <DashboardCard
            data={currentStreak}
            label="Current Streak"
            type="normal"
            icon={IoFlame}
            gradient="from-amber-400 to-orange-500"
          />
          <DashboardCard
            data={longestStreak}
            label="Longest Streak"
            type="normal"
            icon={IoTrophy}
            gradient="from-yellow-400 to-amber-500"
          />
          <DashboardCard
            data={totalHabit}
            label="Habits Completed"
            type="normal"
            icon={IoCheckmarkCircle}
            gradient="from-orange-400 to-red-500"
          />
        </div>
        {/* Main Grid - takes remaining height */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-3 flex-1 lg:min-h-0 min-h-200">
          {/* Left Column */}
          <div className="flex flex-col gap-3 min-w-0 lg:h-full lg:max-h-full">
            {/* Activity + Log */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.5fr] gap-3 lg:h-full lg:max-h-full lg:min-h-0">
              {/* Heatmap & Log column */}
              <div className="flex flex-col gap-3 h-175">
                <div className="flex-none">
                  <ActivityHeatmap />
                </div>
                <div className="glass-card flex-1 flex p-4 min-h-62 lg:min-h-0">
                  <LogActivity />
                </div>
              </div>

              {/* Progress, Top, Chart column */}
              <div className="flex flex-col gap-3 lg:h-full lg:max-h-full lg:min-h-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-none">
                  <DailyProgressBar />
                  <TopHabits />
                </div>

                <div className="glass-card flex-1 px-4 py-3 w-full h-90 flex flex-col">
                  <div className="flex items-center gap-3 mb-2 flex-none">
                    <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-xl shadow-md shadow-amber-500/20">
                      <IoStatsChartSharp className="fill-white w-4 h-4" />
                    </div>
                    <h2 className="text-base font-bold text-gray-700">
                      Weekly Chart
                    </h2>
                  </div>
                  {/* The chart container must be positioned absolute inside relative flex child so it can shrink */}
                  <div className="flex-1 h-60 lg:min-h-0 relative">
                    <div className="absolute inset-0">
                      <WeeklyChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Today Habits + Streak */}
          <div className="flex flex-col gap-3 lg:h-full lg:max-h-full lg:min-h-0">
            <TodayHabits />
            <div className="flex-none">
              <StreakCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
