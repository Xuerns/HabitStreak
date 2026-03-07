import { useState } from "react";
import { fetchApi } from "../../service/fetchApi";
import { useHabitsStore } from "../../hooks/useHabitsStore";
import { FaWpforms } from "react-icons/fa";
import { useStreakTheme } from "../../hooks/useStreakTheme";

interface HabitsFormProps {
  onCancel: () => void;
}

export default function HabitsForm({ onCancel }: HabitsFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setHabits, setIsFeedback, setFeedback } = useHabitsStore();
  const theme = useStreakTheme();

  const handleSubmit = async () => {
    try {
      const res = await fetchApi.createHabits({ title, description });
      setTitle("");
      setDescription("");
      const data = await fetchApi.gethabits();
      setIsFeedback("succes");
      console.log(res.titleMessage, res.message)
      setFeedback(res.titleMessage, res.message);
      setHabits(data);
    } catch (err: any) {
      setIsFeedback("error")
      console.log(err);
      setFeedback(err.response?.data?.titleMessage, err.response?.data?.message,)
    } finally {
      setTimeout(() => {
        setIsFeedback("");
        setFeedback("", "");
      }, 2000)
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="glass-card w-full max-w-md p-6 flex flex-col gap-4 shadow-2xl animate-slideUp">
          <div className="flex items-center gap-3">
            <div
              className={`${theme.gradientBg} p-2.5 rounded-xl shadow-md ${theme.shadow}`}
            >
              <FaWpforms className="fill-white w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Create Your Habit
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Morning exercise"
                className={`px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 text-sm focus:outline-none focus:ring-2 ${theme.focusRing} transition-all`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. 30 minutes workout every day"
                className={`px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 text-sm focus:outline-none focus:ring-2 ${theme.focusRing} transition-all`}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-semibold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleSubmit();
                onCancel();
              }}
              className={`px-5 py-2 text-sm font-semibold rounded-xl bg-linear-to-r ${theme.gradient} text-white hover:shadow-lg hover:${theme.shadow}/25 transition-all cursor-pointer`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
