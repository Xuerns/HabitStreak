import { useState } from "react";
import { fetchApi } from "../../service/fetchApi";
import { useHabitsStore } from "../../hooks/useHabitsStore";

export default function HabitsForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setHabits } = useHabitsStore();

  // Handle Submit / Tambah habits
  const handleSubmit = async () => {
    await fetchApi.createHabits({ title, description });
    setTitle("");
    setDescription("");
    const data = await fetchApi.gethabits();
    setHabits(data);
  };

  return <div>HabitsForm</div>;
}
