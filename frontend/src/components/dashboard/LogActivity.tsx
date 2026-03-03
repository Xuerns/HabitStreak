import { AiOutlineHistory } from "react-icons/ai";
import { FaUndo } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useDashboardStore } from "../../hooks/useDashboardStore";

export default function LogActivity() {
  const { activityLogs } = useDashboardStore();

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHour = Math.floor(diffMin / 60);

    if (diffMin < 1) return "Baru saja";
    if (diffMin < 60) return `${diffMin} menit lalu`;
    if (diffHour < 12) return `${diffHour} jam lalu`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex items-center gap-3">
        <div className="bg-linear-to-br from-amber-400 to-orange-500 p-2 rounded-xl shadow-md shadow-amber-500/20">
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
                      ? `Anda Mengundo ${log.title}`
                      : `Anda Menyelesaikan ${log.title}`}
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
