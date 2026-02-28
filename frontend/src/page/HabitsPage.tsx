import { useEffect, useState } from "react";
import { fetchApi } from "../service/fetchApi";
import { useHabitsStore } from "../hooks/useHabitsStore";
import HabitsCard from "../components/habitsPage/HabitsCard";
import HabitsHeaders from "../components/habitsPage/HabitsHeaders";

interface habit {
  id: number;
  TITLE: string;
  DESCRIPTION: string;
}

export default function HabitsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { Habits, setHabits, removeHabit, updateHabit, toggleComplete } =
    useHabitsStore();

  // Handle Submit / Tambah habits
  const handleSubmit = async () => {
    await fetchApi.createHabits({ title, description });
    setTitle("");
    setDescription("");
    const data = await fetchApi.gethabits();
    setHabits(data);
  };

  // Handle delete / Delete habits
  const handleDelete = async (id: number) => {
    await fetchApi.deleteHabits(id);
    removeHabit(id)
  };

  // Handle Update / Ubah Habits
  const handleUpdate = async (id: number) => {
    await fetchApi.updateHabits({ title, description }, id);
    const data = await fetchApi.gethabits();
    setHabits(data);
  };

  const handleUndo = async (id: number) => {
    await fetchApi.undohabit(id);
    toggleComplete(id, false)
  };

  const handleComplete = async (id: number) => {
    try {
      await fetchApi.completeHabits(id);
      toggleComplete(id, true)
    } catch (error: any) {
      const msg = error.response?.data?.message || "Gagal menyelesaikan habit";
      console.error("Error:", msg);
      alert(msg);
    }
  };

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
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3">
        {Habits.map((item) => (
          <HabitsCard key={item.id} title={item.title} description={item.DESCRIPTION} is_completed={item.is_completed} create_at={item.create_at}/>
        ))}
      </ul>
    </div>
  );
}
