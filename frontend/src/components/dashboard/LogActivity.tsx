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
        <div className="bg-amber-400 flex items-center justify-center p-2 rounded">
          <AiOutlineHistory className="w-6 h-6 fill-white" />
        </div>
        <h4 className="text-gray-700 text-xl font-bold">Recent Activity</h4>
      </div>
      <ul
        className={`flex flex-col h-full overflow-y-scroll rounded-md [overflow-style:none] [scrollbar-width:none] gap-2 bg-gray-100 p-2 ${activityLogs.length === 0 && "items-center justify-center "}`}
      >
        {activityLogs.length === 0 ? (
          <span className="text-md font-bold text-gray-400">
            Belum ada aktivitas
          </span>
        ) : (
          activityLogs.map((log) => (
            <li className="flex items-center gap-2 text-gray-500">
              <div className="bg-gray-200 flex justify-between items-center py-1 px-2 rounded-md flex-1">
                <span className="text-sm flex items-center gap-2">
                  {log.action === "undo" ? <FaUndo /> : <FaCheckCircle />}
                  {log.action === "undo"
                    ? `Anda Mengundo ${log.title}`
                    : `Anda Menyelesaikan ${log.title}`}
                </span>
                <span className="text-xs">{formatTime(log.created_at)}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
