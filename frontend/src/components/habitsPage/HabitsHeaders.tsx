import { useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import HabitsForm from "./HabitsForm";

export default function HabitsHeaders() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex itme items-center justify-between py-5">
      <div>
        <h1 className="text-3xl font-bold">My Habits</h1>
        <h5 className="text-gray-600">Track and improve your daily routines</h5>
      </div>
      <div className="relative">
        <button
          className="flex items-center gap-1 bg-amber-400 text-white py-2 px-2 rounded-lg hover:bg-amber-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AiFillPlusSquare className="h-5 w-5" />
          <span className="text-sm">Create New Habit</span>
        </button>
        {isOpen && <HabitsForm onCancel={() => setIsOpen(false)}/>}
      </div>
    </div>
  );
}
