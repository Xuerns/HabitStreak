import { IoIosTrendingUp } from "react-icons/io";
import { useDashboardStore } from "../../hooks/useDashboardStore";
import ListHabitDashboard from "./ListHabitDashboard";
import { fetchApi } from "../../service/fetchApi";
import { useStreakTheme } from "../../hooks/useStreakTheme";
import GlassCardSkeleton from "../skeleton/GlassCardSkeleton";
import ListItemSkeleton from "../skeleton/ListItemSkeleton";

export default function TodayHabits() {
  const { todayHabits, toggleTodayHabits, isLoading } = useDashboardStore();
  const theme = useStreakTheme();

  const handleToggle = async (id: number) => {
    const habit = todayHabits.find((h) => h.id === id);
    if (!habit) return;

    // Optimistic update — UI updates instantly
    toggleTodayHabits(id);

    try {
      if (habit.is_completed) {
        await fetchApi.undohabit(id);
      } else {
        await fetchApi.completeHabits(id);
      }
    } catch (error: any) {
      // Rollback on failure
      toggleTodayHabits(id);
      console.log(error.message);
    }
  };

  if (isLoading) {
    return (
      <GlassCardSkeleton className="flex-1 min-h-0 overflow-hidden">
        <ListItemSkeleton count={4} />
      </GlassCardSkeleton>
    );
  }

  return (
    <div className="glass-card flex-1 p-4 flex flex-col gap-2 min-h-0 overflow-hidden">
      <div className="flex flex-col shrink-0">
        <div className="flex items-center gap-2.5">
          <div
            className={`${theme.gradientBg} p-2 rounded-xl shadow-md ${theme.shadow}`}
          >
            <IoIosTrendingUp className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h3 className={`text-base sm:text-lg font-bold ${theme.primary}`}>
              Today Habit
            </h3>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 text-left pl-11 mt-0.5">
          Track your daily habits and stay consistent
        </p>
      </div>

      <ul className="flex flex-col gap-2 p-1 overflow-y-auto flex-1 max-h-85 [scrollbar-width:none]">
        {(todayHabits ?? []).length === 0 ? (
          <div className="rounded-xl flex justify-center items-center h-full">
            <h4 className="font-bold text-gray-300 text-sm">Belum Ada Habit</h4>
          </div>
        ) : (
          todayHabits.map((item) => (
            <ListHabitDashboard
              key={item.id}
              title={item.title}
              id={item.id}
              is_completed={item.is_completed}
              handleToggle={handleToggle}
            />
          ))
        )}
      </ul>
    </div>
  );
}
