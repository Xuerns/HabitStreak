import { useState } from "react";
import { fetchApi } from "../../service/fetchApi";
import { useHabitsStore } from "../../hooks/useHabitsStore";

interface ChangeFormProps {
  title: string;
  description: string;
  id: number;
  onCancel: () => void;
  onSaved: () => void;
}

export default function ChangeForm({
  title,
  description,
  id,
  onCancel,
  onSaved,
}: ChangeFormProps) {
  const [formData, setFormData] = useState({
    title,
    description,
  });
  const { setHabits } = useHabitsStore();
  // Handle Update / Ubah Habits
  const handleSave = async () => {
    await fetchApi.updateHabits(formData, id);
    const data = await fetchApi.gethabits();
    setHabits(data);
    onSaved();
  };

  return (
    <div className="flex flex-col gap-2 py-2">
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Habit Title"
        className="border border-gray-200 focus:outline-none w-full focus:ring-amber-400 focus:ring-1 text-sm px-3 py-1 rounded"
      />
      <textarea
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Description"
        rows={2}
        className="border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-offset-amber-400 text-sm w-full px-3 py-1"
      />
      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          className="text-xs px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="text-xs px-3 py-1 rounded bg-amber-400 text-white hover:bg-amber-600 cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
}
