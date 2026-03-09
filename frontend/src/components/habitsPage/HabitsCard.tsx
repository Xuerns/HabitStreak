import { VscSettings } from "react-icons/vsc";
import { fetchApi } from "../../service/fetchApi";
import { useHabitsStore } from "../../hooks/useHabitsStore";
import { useState, useRef, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import ChangeForm from "./ChangeForm";
import { useStreakTheme } from "../../hooks/useStreakTheme";

interface HabitsCardProps {
  title: string;
  description: string;
  is_completed?: boolean;
  create_at: string;
  id: number;
}

export default function HabitsCard({
  title,
  description,
  is_completed,
  create_at,
  id,
}: HabitsCardProps) {
  const dateFormat = (date: string) => {
    const dateStr = new Date(date);
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Des",
    ];
    return `${String(dateStr.getDate()).padStart(2, "0")}-${month[dateStr.getMonth()]}-${dateStr.getFullYear()}`;
  };

  const [isEditing, setIsEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { removeHabit, toggleComplete, setFeedback, setIsFeedback } =
    useHabitsStore();
  const theme = useStreakTheme();

  const handleDelete = async (id: number) => {
    try {
      const res = await fetchApi.deleteHabits(id);
      setIsFeedback("succes");
      setFeedback(res.titleMessage, res.message);
      removeHabit(id);
    } catch (err: any) {
      setIsFeedback("error");
      setFeedback(
        err.response?.data?.titleMessage,
        err.response?.data?.message,
      );
    } finally {
      setTimeout(() => {
        setIsFeedback("");
        setFeedback(
          "",
          "",
        );
      }, 2000);
    }
  };

  const handleUndo = async (id: number) => {
    await fetchApi.undohabit(id);
    toggleComplete(id, false);
  };

  const handleComplete = async (id: number) => {
    try {
      await fetchApi.completeHabits(id);
      toggleComplete(id, true);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Gagal menyelesaikan habit";
      console.error("Error:", msg);
      alert(msg);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <li
      className={`glass-card relative overflow-hidden py-3 px-4 flex flex-col gap-2 group hover:shadow-lg hover:shadow-gray-300/20 hover:scale-[1.01] transition-all duration-200 ${
        is_completed
          ? `border-l-3 ${theme.border}`
          : "border-l-3 border-l-gray-200"
      }`}
    >
      {/* Status + Menu Row */}
      <div className="flex justify-between items-center">
        <button
          className={`text-xs font-semibold px-3 py-1 rounded-full cursor-pointer transition-all duration-200 ${
            is_completed
              ? `${theme.completedBadgeBg} ${theme.completedBadgeText} hover:${theme.accentMedium}`
              : `${theme.accentLight} ${theme.badgeText} hover:${theme.accentMedium}`
          }`}
          onClick={() => (is_completed ? handleUndo(id) : handleComplete(id))}
        >
          {is_completed ? "✓ Complete" : "Incomplete"}
        </button>

        {/* Menu */}
        <div className="relative" ref={menuRef}>
          <button
            className="cursor-pointer p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <VscSettings className="w-4 h-4" />
          </button>
          {menuOpen && (
            <div className="absolute bg-white right-0 mt-1 w-36 border border-gray-100 rounded-xl shadow-xl z-10 overflow-hidden">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-600"
              >
                <MdModeEditOutline className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => {
                  handleDelete(id);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm hover:bg-red-50 hover:text-red-500 cursor-pointer flex items-center gap-2 text-gray-600"
              >
                <RiDeleteBin6Line className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <ChangeForm
          title={title}
          description={description}
          id={id}
          onCancel={() => setIsEditing(false)}
          onSaved={() => setIsEditing(false)}
        />
      ) : (
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-sm sm:text-base">
            {title}
          </h3>
          <span className="text-xs sm:text-sm text-gray-400 line-clamp-2">
            {description}
          </span>
        </div>
      )}

      {/* Date */}
      <div className="pt-1 border-t border-gray-100">
        <span className="text-[11px] text-gray-400 font-medium">
          {dateFormat(create_at)}
        </span>
      </div>
    </li>
  );
}
