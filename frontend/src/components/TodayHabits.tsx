import { IoIosTrendingUp } from "react-icons/io";
import { useDashboardStore } from "../hooks/useDashboardStore";
import ListHabitDashboard from "./ListHabitDashboard";

export default function TodayHabits() {
  const { todayHabits } = useDashboardStore();

  return (
    <div className="border border-gray-200 shadow-sm rounded-md flex-1 p-4 flex flex-col gap-2 min-h-0 overflow-hidden">
      <div className="flex flex-col shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-amber-400 p-2 rounded-xl shadow-sm shadow-amber-200 ">
            <IoIosTrendingUp className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-400">Today Habit</h3>
          </div>
        </div>
        <p className="text-xs text-gray-400 text-left pl-10">
          Track your daily habits and stay consistent
        </p>
      </div>

      <ul className="flex flex-col gap-2 p-1 overflow-y-auto flex-1 min-h-0 [scrollbar-width:none]">
        {todayHabits.map((item) => (
          <ListHabitDashboard key={item.id} title={item.title} />
        ))}
      </ul>
    </div>
  );
}
