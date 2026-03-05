import type { IconType } from "react-icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface DashboardCardProps {
  data: string | number;
  label: string;
  type: "precentage" | "normal";
  icon?: IconType;
  gradient?: string;
  isLoading?: boolean;
}

export default function DashboardCard({
  data,
  label,
  type,
  icon: Icon,
  gradient = "from-amber-400 to-orange-500",
  isLoading = false,
}: DashboardCardProps) {
  if (isLoading) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-gray-200/60 p-4 shadow-md">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-300/20 rounded-full" />
        <div className="relative z-10">
          <div className="mb-2">
            <Skeleton
              width={36}
              height={36}
              borderRadius={8}
              baseColor="#d1d5db"
              highlightColor="#e5e7eb"
            />
          </div>
          <div className="mt-4">
            <Skeleton
              width={80}
              height={28}
              baseColor="#d1d5db"
              highlightColor="#e5e7eb"
            />
            <Skeleton
              width={100}
              height={12}
              baseColor="#d1d5db"
              highlightColor="#e5e7eb"
              style={{ marginTop: 6 }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-linear-to-br ${gradient} p-4 text-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 duration-300 group`}
    >
      {/* Background decoration */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-500" />
      <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/5 rounded-full" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            {Icon ? (
              <Icon className="w-5 h-5 text-white" />
            ) : (
              <div className="w-5 h-5" />
            )}
          </div>
        </div>

        <div className="mt-4">
          <span className="text-2xl sm:text-3xl font-bold">
            {data}
            <span className="text-base font-medium ml-1">
              {`${typeof data === "number" && type === "precentage" ? "%" : ""}`}
            </span>
          </span>
          <p className="text-xs sm:text-sm font-medium text-white/80 tracking-wide mt-1">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
