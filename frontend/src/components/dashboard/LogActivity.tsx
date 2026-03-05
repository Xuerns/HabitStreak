import { AiOutlineHistory } from "react-icons/ai";
import { FaUndo } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useDashboardStore } from "../../hooks/useDashboardStore";
import { useStreakTheme } from "../../hooks/useStreakTheme";
import GlassCardSkeleton from "../skeleton/GlassCardSkeleton";
import ListItemSkeleton from "../skeleton/ListItemSkeleton";

export default function LogActivity() {
  const { activityLogs, isLoading } = useDashboardStore();
  const theme = useStreakTheme();

  if (isLoading) {
    return (
      <GlassCardSkeleton className="w-full">
        <ListItemSkeleton count={4} />
      </GlassCardSkeleton>
    );
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHour = Math.floor(diffMin / 60);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60)
      return `${diffMin} ${diffMin === 1 ? "minute" : "minutes"} ago`;
    if (diffHour < 12)
      return `${diffHour} ${diffHour === 1 ? "hour" : "hours"} ago`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex items-center gap-3">
        <div
          className={`${theme.gradientBg} p-2 rounded-xl shadow-md ${theme.shadow}`}
        >
          <AiOutlineHistory className="w-5 h-5 fill-white" />
        </div>
        <h4 className="text-gray-700 text-base sm:text-lg font-bold">
          Recent Activity
        </h4>
      </div>
      <ul
        className={`flex flex-col h-full overflow-y-auto rounded-xl [scrollbar-width:none] gap-1.5 bg-gray-50/50 p-2 ${(activityLogs ?? []).length === 0 && "items-center justify-center"}`}
      >
        {(activityLogs ?? []).length === 0 ? (
          <span className="text-sm font-bold text-gray-300">
            Belum ada aktivitas
          </span>
        ) : (
          activityLogs.map((log, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-500">
              <div className="bg-white flex justify-between items-center py-2 px-3 rounded-xl flex-1 border border-gray-100 hover:shadow-sm transition-shadow duration-200">
                <span className="text-xs sm:text-sm flex items-center gap-2">
                  {log.action === "undo" ? (
                    <FaUndo className="fill-red-400 shrink-0" />
                  ) : (
                    <FaCheckCircle className="fill-green-400 shrink-0" />
                  )}
                  <span className="truncate">
                    {log.action === "undo"
                      ? `Marked ${log.title} as incomplete`
                      : `Marked ${log.title} as completed`}
                  </span>
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 shrink-0 ml-2">
                  {formatTime(log.created_at)}
                </span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
