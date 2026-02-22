import { useEffect, useState } from "react";
import { fetchApi } from "../service/fetchApi";

interface habit {
  id: number;
  TITLE: string;
  DESCRIPTION: string;
}

export default function HabitsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
  // const handleUpdate = async (id: number) => {
  //   const data = await fetchApi.updateHabits({ title, description }, id);
  //   console.log(data);
  //   await getHabits();
  // };

  const handleUndo = async (id: number) => {
    const data = await fetchApi.undohabit(id);
    console.log(data);
  };

  

  const handleComplete = async (id: number) => {
    try {
      await fetchApi.completeHabits(id);
      await getHabits();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Gagal menyelesaikan habit";
      console.error("Error:", msg);
      alert(msg);
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  return (
    <div>
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
      <ul>
        {habits.map((item) => (
          <li key={item.id} className="flex">
            <button onClick={() => handleComplete(item.id)}>Done</button>
            <p>{item.DESCRIPTION}</p>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <button onClick={() => handleUndo(item.id)}>Reset</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
