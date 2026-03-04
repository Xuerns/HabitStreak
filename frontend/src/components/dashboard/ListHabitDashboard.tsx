import { IoCheckmark } from "react-icons/io5";
import { useStreakTheme } from "../../hooks/useStreakTheme";

interface ListHabitDashboardProps {
  title: string;
  id: number;
  is_completed?: boolean;
  handleToggle: (id: number) => void;
}

export default function ListHabitDashboard({
  title,
  id,
  is_completed,
  handleToggle,
}: ListHabitDashboardProps) {
  const theme = useStreakTheme();
  return (
    <li
      className={`flex justify-between items-center gap-3 p-3 rounded-xl bg-white/80 border border-gray-100 hover:shadow-md hover:shadow-gray-300/20 ${theme.hoverBg} group transition-all duration-200`}
    >
      <button
        className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0
          transition-all duration-500 ease-in-out cursor-pointer
          ${
            is_completed
              ? `${theme.checkboxCompleted} ring-2 ${theme.checkboxRing} shadow-md ${theme.checkboxShadow}`
              : `bg-white ring-1 ring-gray-200 ${theme.checkboxHoverRing}`
          }`}
        onClick={() => handleToggle(id)}
      >
        <IoCheckmark
          className={`w-3 h-3 text-white transition-all duration-500 ease-in-out
            ${is_completed ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
        />
      </button>

      <div className="flex-1 flex justify-between items-center">
        <span
          className={`transition-all duration-300 text-xs ${
            is_completed
              ? "text-gray-400 line-through"
              : `text-gray-700 ${theme.hoverText}`
          }`}
        >
          {title}
        </span>

        <span
          className={`text-[11px] shrink-0 font-semibold px-2.5 py-0.5 rounded-full transition-all duration-500 ease-out
            ${
              is_completed
                ? `${theme.completedBadgeBg} ${theme.completedBadgeText} opacity-100 translate-x-0`
                : "bg-transparent text-transparent opacity-0 translate-x-4"
            }`}
        >
          Done ✓
        </span>
      </div>
    </li>
  );
}
