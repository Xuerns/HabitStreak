
interface DashboardCardProps {
  data: string | number;
  label: string;
  type: "precentage" | "normal";
}

export default function DashboardCard({
  data,
  label,
  type,
}: DashboardCardProps) {
  

  return (
    <div className="bg-amber-600 rounded overflow-hidden">
      <div className="bg-amber-500 w-full h-full rounded-br-[2em] ring-1 ring-white">
        <div className=" w-full h-full rounded-br-full bg-amber-400 ring-1 ring-white">
          <div className="px-2 py-1 bg-amber-300 h-full w-[90%] rounded-br-full ring-1 ring-white">
            <h6 className="font-semibold text-2xl ">{label}</h6>
            <span className="text-lg font-bold">
              {data}
              {`${typeof data === "number" && type === "precentage" ? "%" : ""} `}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
