import { useDashboardStore } from "../hooks/useDashboardStore";
import { IoIosPodium } from "react-icons/io";

export default function TopHabits() {
  const { topHabits } = useDashboardStore();
  return (
    <div className="border border-gray-200 shadow-sm rounded-md px-3 pt-3 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-amber-400 p-2 rounded shadow-sm shadow-amber-300">
          <IoIosPodium className="h-6 w-6 fill-white" />
        </div>
        <div>
          <h3 className="text-gray-700 text-xl font-bold">Top 3 Habit</h3>
          <h5 className="text-xs text-gray-500">Your strongest routines</h5>
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        {topHabits.map((item, index) => (
          <div className="flex items-center w-full gap-2 " key={item.id}>
            <span className="text-xl font-semibold px-3 py-1 text-amber-500 rounded-lg bg-amber-200">
              {index + 1}
            </span>
            <li
              key={item.id}
              className="flex flex-1 justify-between items-center bg-gray-50 border border-gray-300 p-2 rounded-xl group hover:shadow-md hover:shadow-gray-400/50 hover:bg-amber-50/50"
            >
              <span className="font-medium text-gray-700 group-hover:text-amber-500">
                {item.title}
              </span>
              <div className="px-2 bg-amber-200 rounded">
                <span className="font-bold text-amber-500 text-sm">
                  {item.total_completed}
                </span>
              </div>
            </li>
          </div>
        ))}
      </ul>
      <div className="flex items-center justify-center flex-1">
        <span className="bg-amber-200 px-10 py-1 rounded-lg shadow-sm shadow-amber-400">
          <h5 className="font-semibold text-amber-600">Small habits, big impact</h5>
        </span>
      </div>
    </div>
  );
}
