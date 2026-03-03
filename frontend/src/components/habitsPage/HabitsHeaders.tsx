import { useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import HabitsForm from "./HabitsForm";

export default function HabitsHeaders() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between py-4 sm:py-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            My Habits
          </h1>
          <h5 className="text-sm text-gray-400 mt-0.5">
            Track and improve your daily routines
          </h5>
        </div>
        <button
          className="flex items-center gap-1.5 bg-linear-to-r from-amber-400 to-orange-500 text-white py-2.5 px-4 rounded-xl hover:shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AiFillPlusSquare className="h-5 w-5" />
          <span className="text-sm font-semibold hidden sm:inline">
            Create New Habit
          </span>
          <span className="text-sm font-semibold sm:hidden">New</span>
        </button>
      </div>

      {/* Modal Form */}
      {isOpen && <HabitsForm onCancel={() => setIsOpen(false)} />}
    </>
  );
}
