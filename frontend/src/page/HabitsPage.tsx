import { useEffect } from "react";
import { fetchApi } from "../service/fetchApi";
import { useHabitsStore } from "../hooks/useHabitsStore";
import HabitsCard from "../components/habitsPage/HabitsCard";
import HabitsHeaders from "../components/habitsPage/HabitsHeaders";

export default function HabitsPage() {
  const { Habits, setHabits } = useHabitsStore();

  useEffect(() => {
    const fetchHabits = async () => {
      const data = await fetchApi.gethabits();
      setHabits(data);
    };
    fetchHabits();
  }, []);

  return (
    <div>
      <HabitsHeaders />
      {(Habits ?? []).length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-300 font-bold text-lg">Belum ada habit</p>
            <p className="text-gray-400 text-sm mt-1">
              Mulai dengan membuat habit pertamamu!
            </p>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Habits.map((item) => (
            <HabitsCard
              key={item.id}
              title={item.title}
              description={item.DESCRIPTION}
              is_completed={item.is_completed}
              create_at={item.create_at}
              id={item.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
