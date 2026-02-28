import { VscSettings } from "react-icons/vsc";
import { fetchApi } from "../../service/fetchApi";
import { useHabitsStore } from "../../hooks/useHabitsStore";
import { useState, useRef, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import ChangeForm from "./ChangeForm";
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
  const { removeHabit, setHabits, toggleComplete } = useHabitsStore();

  // Handle delete / Delete habits
  const handleDelete = async (id: number) => {
    await fetchApi.deleteHabits(id);
    removeHabit(id);
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

  // Tutup dropdown ketika klik element atau page diluar menu
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
    <li className="bg-white border border-gray-200 rounded-md shadow-sm py-2 px-3">
      <div className="border-b pb-2 border-b-gray-300 flex justify-between items-center">
        <button
          className={`text-xs p-1 rounded-sm cursor-pointer ${is_completed ? "bg-green-200" : "bg-red-200"}`}
          onClick={() => (is_completed ? handleUndo(id) : handleComplete(id))}
        >
          {is_completed ? "✓ complete" : `incomplete`}
        </button>
        {/* Menu (update / Delete)*/}
        <div className="relative">
          <button
            className="cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <VscSettings />
          </button>
          {menuOpen && (
            <div className="absolute bg-white right-0  mt-1 w-32 border border-gray-200 rounded-md shadow-lg z-10 overflow-hidden">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              >
                <MdModeEditOutline />
                Change
              </button>
              <button
                onClick={() => {
                  handleDelete(id);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 hover:text-red-400 cursor-pointer flex items-center gap-2"
              >
                <RiDeleteBin6Line />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* edit Form / Change Form */}
      {isEditing ? (
        <ChangeForm
          title={title}
          description={description}
          id={id}
          onCancel={() => setIsEditing(false)}
          onSaved={() => setIsEditing(false)}
        />
      ) : (
        <div className="border-b border-b-gray-300 pb-5">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-sm">{description}</span>
        </div>
      )}

      <div>
        <span className="text-xs">{dateFormat(create_at)}</span>
      </div>
    </li>
  );
}
