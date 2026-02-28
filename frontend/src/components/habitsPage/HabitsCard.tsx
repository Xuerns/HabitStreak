import { VscSettings } from "react-icons/vsc";

interface HabitsCardProps {
    title: string;
    description: string;
    is_completed?: boolean;
    create_at: string;
}

export default function HabitsCard({title, description, is_completed, create_at}: HabitsCardProps) {

    const dateFormat = (date: string) => {
        const dateStr = new Date(date);
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"];
        return `${String(dateStr.getDate()).padStart(2, "0")}-${month[dateStr.getMonth() + 1]}-${dateStr.getFullYear()}`;
    }

  return (
    <li className="bg-white border border-gray-200 rounded-md shadow-sm py-2 px-3">
      <div className="border-b pb-2 border-b-gray-300 flex justify-between items-center">
        <span className={`text-xs p-1 rounded-sm ${is_completed ? "bg-green-200" : "bg-red-200"}`}>{is_completed ? "complete" : `incomplete`}</span>
        <VscSettings/>
      </div>
      <div className="border-b border-b-gray-300 pb-5">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm">{description}</span>
      </div>
      <div>
        <span className="text-xs">
            {dateFormat(create_at)}
        </span>
      </div>
    </li>
  )
}
