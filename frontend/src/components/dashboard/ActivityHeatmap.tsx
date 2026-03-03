import { useDashboardStore } from "../../hooks/useDashboardStore";

export default function ActivityHeatmap() {
  const { heatMaps } = useDashboardStore();

  const getCurrentMonthDays = () => {
    const dates = [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDay; i++) {
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      dates.push(dateString);
    }
    return dates;
  };

  const days = getCurrentMonthDays();

  const heatmapDict = (heatMaps ?? []).reduce(
    (acc, curr) => {
      acc[curr.date] = curr.count;
      return acc;
    },
    {} as Record<string, number>,
  );

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-100";
    if (count === 1) return "bg-amber-200";
    if (count === 2) return "bg-amber-300";
    if (count === 3) return "bg-amber-400";
    return "bg-amber-500";
  };

  return (
    <div className="glass-card flex items-center justify-center p-4 w-full flex-col shrink-0">
      <h3 className="font-semibold text-gray-700 mb-3 text-sm self-start">
        Activity (This Month)
      </h3>

      <div className="grid grid-cols-7 sm:grid-cols-10 grid-rows-auto gap-1 w-fit">
        {days.map((date) => {
          const count = heatmapDict[date] || 0;
          return (
            <div
              key={date}
              title={`${date}: ${count} habits`}
              className={`w-4 h-4 rounded-md ${getColor(count)} cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-offset-1 hover:ring-amber-400/50 hover:scale-110`}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-1.5 mt-3 text-[10px] text-gray-400 self-end font-medium">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-gray-100" />
        <div className="w-3 h-3 rounded-sm bg-amber-200" />
        <div className="w-3 h-3 rounded-sm bg-amber-300" />
        <div className="w-3 h-3 rounded-sm bg-amber-400" />
        <div className="w-3 h-3 rounded-sm bg-amber-500" />
        <span>More</span>
      </div>
    </div>
  );
}
