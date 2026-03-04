import { IoIosPodium } from "react-icons/io";
import { useDashboardStore } from "../../hooks/useDashboardStore";
import { useStreakTheme } from "../../hooks/useStreakTheme";

export default function TopHabits() {
  const { topHabits } = useDashboardStore();
  const theme = useStreakTheme();
  return (
    <div className="glass-card px-4 pt-4 pb-3 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`${theme.gradientBg} p-2 rounded-xl shadow-md ${theme.shadow}`}
        >
          <IoIosPodium className="h-5 w-5 fill-white" />
        </div>
        <div>
          <h3 className="text-gray-700 text-base sm:text-lg font-bold">
            Top 3 Habit
          </h3>
          <h5 className="text-[11px] text-gray-400">Your strongest routines</h5>
        </div>
      </div>
      {(topHabits ?? []).length === 0 ? (
        <div className="flex items-center justify-center flex-1 rounded-xl">
          <h4 className="font-bold text-gray-300 text-sm">Belum Ada Habit</h4>
        </div>
      ) : (
        <div className="flex flex-col flex-1 gap-2">
          <ul className="flex flex-col gap-2 flex-1">
            {(topHabits ?? []).map((item, index) => (
              <div className="flex items-center w-full gap-2" key={item.id}>
                <span
                  className={`text-lg font-bold w-8 h-8 flex items-center justify-center ${theme.primary} rounded-lg ${theme.accentLight}`}
                >
                  {index + 1}
                </span>
                <li
                  className={`flex flex-1 justify-between items-center bg-gray-50/80 border border-gray-100 p-2.5 rounded-xl group hover:shadow-md hover:shadow-gray-300/30 ${theme.hoverBg} transition-all duration-200`}
                >
                  <span
                    className={`font-medium text-sm text-gray-700 ${theme.hoverText} transition-colors`}
                  >
                    {item.title}
                  </span>
                  <div
                    className={`px-2.5 py-0.5 ${theme.badgeBg} rounded-full`}
                  >
                    <span className={`font-bold ${theme.badgeText} text-xs`}>
                      {item.total_completed}
                    </span>
                  </div>
                </li>
              </div>
            ))}
          </ul>
          <div className="flex items-center justify-center pt-1">
            <span className="text-[11px] font-medium text-gray-400 italic">
              Small habits, big impact 
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
