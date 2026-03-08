import { useState } from "react";
import { fetchApi } from "../../service/fetchApi";
import { useHabitsStore } from "../../hooks/useHabitsStore";
import { useStreakTheme } from "../../hooks/useStreakTheme";

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
  const { setHabits, setFeedback, setIsFeedback } = useHabitsStore();
  const theme = useStreakTheme();

  const handleSave = async () => {
    try {
      const res = await fetchApi.updateHabits(formData, id);
      const data = await fetchApi.gethabits();
      setIsFeedback("succes");
      setFeedback(res.titleMessage, res.message);
      setHabits(data);
      onSaved();
    } catch (err: any) {
      setIsFeedback("error");
      setFeedback(err.response?.data?.titleMessage, err.response?.data?.message);
    } finally {
      setTimeout(() => {
        setIsFeedback("");
        setFeedback("", "");
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col gap-2 py-1">
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Habit Title"
        className={`border border-gray-200 focus:outline-none w-full focus:ring-2 ${theme.focusRing} text-sm px-3 py-2 rounded-xl bg-gray-50/50 transition-all`}
      />
      <textarea
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Description"
        rows={2}
        className={`border border-gray-200 rounded-xl focus:outline-none focus:ring-2 ${theme.focusRing} text-sm w-full px-3 py-2 bg-gray-50/50 transition-all`}
      />
      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className={`text-xs px-3 py-1.5 rounded-lg bg-linear-to-r ${theme.gradient} text-white hover:shadow-md hover:${theme.shadow} cursor-pointer transition-all`}
        >
          Save
        </button>
      </div>
    </div>
  );
}
