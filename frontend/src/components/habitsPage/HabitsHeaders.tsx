import { AiFillPlusSquare } from "react-icons/ai";

export default function HabitsHeaders() {
  return (
    <div className="flex itme items-center justify-between py-5">
      <div>
        <h1 className="text-3xl font-bold">My Habits</h1>
        <h5 className="text-gray-600">Track and improve your daily routines</h5>
      </div>
      <button className="flex items-center gap-1 bg-amber-400 text-white py-2 px-2 rounded-lg hover:bg-amber-500">
        <AiFillPlusSquare className="h-5 w-5" />
        <span className="text-sm">Add New Habit</span>
      </button>
    </div>
  );
}
