import { IoIosTrendingUp } from "react-icons/io";
import { useDashboardStore } from "../hooks/useDashboardStore";
import ListHabitDashboard from "./ListHabitDashboard";
import { fetchApi } from "../service/fetchApi";

export default function TodayHabits() {
  const { todayHabits, toggleTodayHabits, setCurrentStreak } =
    useDashboardStore();

  const handleToggle = async (id: number) => {
    const habit = todayHabits.find((h) => h.id === id);
    if (!habit) return;

    try {
      let res;
      if (habit.is_completed) {
        res = await fetchApi.undohabit(id);
      } else {
        res = await fetchApi.completeHabits(id);
      }
      toggleTodayHabits(id);
      if (res.streak !== undefined) {
        setCurrentStreak(res.streak);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
          <ListHabitDashboard
            key={item.id}
            title={item.title}
            id={item.id}
            is_completed={item.is_completed}
            handleToggle={handleToggle}
          />
        ))}
      </ul>
    </div>
  );
}
