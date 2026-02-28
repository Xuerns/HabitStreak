import { useEffect } from "react";
import { fetchApi } from "../service/fetchApi";
import { useHabitsStore } from "../hooks/useHabitsStore";
import HabitsCard from "../components/habitsPage/HabitsCard";
import HabitsHeaders from "../components/habitsPage/HabitsHeaders";

export default function HabitsPage() {
  
  const { Habits, setHabits} =
    useHabitsStore();

  // Get habits / Ambil habits yang sudah ada
  useEffect(() => {
    const fetchHabits = async () => {
      const data = await fetchApi.gethabits();
      setHabits(data);
    };
    fetchHabits();
  }, []);

  return (
    <div className="px-2">
      <HabitsHeaders/>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3">
        {Habits.map((item) => (
          <HabitsCard key={item.id} title={item.title} description={item.DESCRIPTION} is_completed={item.is_completed} create_at={item.create_at} id={item.id}/>
        ))}
      </ul>
    </div>
  );
}
