interface ListHabitDashboardProps {
  title: string;
}

export default function ListHabitDashboard({
  title,
}: ListHabitDashboardProps) {

  return (
    <li className="flex justify-between items-center gap-3 p-3 ring-1 ring-gray-100 rounded-xl bg-white hover:shadow-md hover:shadow-gray-400/50 hover:bg-amber-50/50 group">
      <button className="h-4 w-4 ring-1 ring-gray-200 rounded-full group-hover:ring-amber-500" ></button>
      <div className="flex-1 flex justify-between group-hover:text-amber-500">
        <span>{title}</span>
      </div>
    </li>
  );
}
