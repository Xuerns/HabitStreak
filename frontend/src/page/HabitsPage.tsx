import { useEffect, useState } from "react";
import { fetchApi } from "../service/fetchApi";

interface habit {
  id: number;
  TITLE: string;
  DESCRIPTION: string;
  completed: boolean;
  due_date: string | Date
}

export default function HabitsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [habits, setHabits] = useState<habit[]>([]);

  // Get habits / Ambil habits yang sudah ada
  const getHabits = async () => {
    const data = await fetchApi.gethabits();
    console.log(data);
    setHabits(data);
  };

  // Handle Submit / Tambah habits
  const handleSubmit = async () => {
    const data = await fetchApi.createHabits({ title, description });
    setTitle("");
    setDescription("");
    console.log("habits baru: ", data);
    await getHabits(); // refresh list otomatis
  };

  // Handle delete / Delete habits
  const handleDelete = async (id: number) => {
    const data = await fetchApi.deleteHabits(id);
    console.log(data);
    await getHabits(); // refresh list otomatis
  };

  // Handle Update / Ubah Habits
  const handleUpdate = async (id: number) => {
    const data = await fetchApi.updateHabits({ title, description }, id);
    console.log(data);
    await getHabits();
  };

  useEffect(() => {
    getHabits();
  }, []);

  return (
    <div>
      <p>Habits</p>
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
      <label>Date</label>
      <button onClick={handleSubmit}>Submit</button>
      <ul>
        {habits.map((item) => (
          <li key={item.id} className="flex">
            <p>{item.DESCRIPTION}</p>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <p>{item.completed}</p>
            <p>Due: {new Date(item.due_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
