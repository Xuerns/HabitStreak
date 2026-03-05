import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ListItemSkeletonProps {
  count?: number;
}

export default function ListItemSkeleton({ count = 3 }: ListItemSkeletonProps) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 border border-gray-100"
        >
          <Skeleton circle width={20} height={20} />
          <div className="flex-1">
            <Skeleton width={`${70 - i * 15}%`} height={14} />
          </div>
          <Skeleton width={45} height={20} borderRadius={20} />
        </div>
      ))}
    </div>
  );
}
