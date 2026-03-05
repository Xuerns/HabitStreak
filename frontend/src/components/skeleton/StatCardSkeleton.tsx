import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface StatCardSkeletonProps {
  count?: number;
}

export default function StatCardSkeleton({ count = 1 }: StatCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-xl bg-gray-200/60 p-4 shadow-md animate-pulse"
        >
          {/* Background decoration */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-300/20 rounded-full" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
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
      ))}
    </>
  );
}
