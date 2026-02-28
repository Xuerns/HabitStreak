import { useState } from "react";
import { fetchApi } from "../../service/fetchApi";
import { useHabitsStore } from "../../hooks/useHabitsStore";
import { FaWpforms } from "react-icons/fa";

interface HabitsFormProps {
  onCancel: () => void;
}

export default function HabitsForm({ onCancel }: HabitsFormProps) {
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

  return (
    <div className="absolute flex flex-col gap-2 bg-white right-35  mt-1 w-60 border border-gray-200 rounded-md shadow-lg z-10 overflow-hidden p-2">
      <div className="flex items-center gap-2">
        <div className="bg-amber-400 p-2 rounded-md">
          <FaWpforms className="fill-white"/>
        </div>
        <h2 className="text-xl font-semibold">Create Your Habit</h2>
      </div>
      <div>
        <div className="flex flex-col">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title..."
            className="px-2 py-1 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>
        <div className="flex flex-col">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description..."
            className="px-2 py-1 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end pl-2 pt-2">
        <button
          onClick={() => {
            handleSubmit();
            onCancel();
          }}
          className="bg-amber-400 text-sm px-3 py-1 text-white font-semibold rounded-md hover:bg-amber-500"
        >
          Save
        </button>
        <button
          onClick={() => onCancel()}
          className="border border-gray-400 text-sm px-3 py-1 font-semibold rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
