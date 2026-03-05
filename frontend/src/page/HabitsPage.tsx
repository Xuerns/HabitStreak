import { useEffect } from "react";
import { fetchApi } from "../service/fetchApi";
import { useHabitsStore } from "../hooks/useHabitsStore";
import HabitsCard from "../components/habitsPage/HabitsCard";
import HabitsHeaders from "../components/habitsPage/HabitsHeaders";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function HabitCardSkeleton() {
  return (
    <li className="glass-card py-3 px-4 flex flex-col gap-2 border-l-3 border-l-gray-200">
      <div className="flex justify-between items-center">
        <Skeleton width={90} height={24} borderRadius={20} />
        <Skeleton width={24} height={24} borderRadius={8} />
      </div>
      <div className="flex-1">
        <Skeleton width="70%" height={16} />
        <Skeleton width="90%" height={12} style={{ marginTop: 6 }} />
        <Skeleton width="50%" height={12} style={{ marginTop: 4 }} />
      </div>
      <div className="pt-1 border-t border-gray-100">
        <Skeleton width={100} height={10} />
      </div>
    </li>
  );
}

export default function HabitsPage() {
  const { Habits, setHabits, isLoading, setIsLoading } = useHabitsStore();

  useEffect(() => {
    const fetchHabits = async () => {
      const data = await fetchApi.gethabits();
      setHabits(data);
      setIsLoading(false);
    };
    fetchHabits();
  }, []);

  return (
    <div>
      <HabitsHeaders />
      {isLoading ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <HabitCardSkeleton key={i} />
          ))}
        </ul>
      ) : (Habits ?? []).length === 0 ? (
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
