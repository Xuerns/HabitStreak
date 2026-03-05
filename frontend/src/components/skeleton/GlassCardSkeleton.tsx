import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface GlassCardSkeletonProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCardSkeleton({
  children,
  className = "",
}: GlassCardSkeletonProps) {
  return (
    <div className={`glass-card p-4 flex flex-col gap-3 ${className}`}>
      {/* Header: icon + title */}
      <div className="flex items-center gap-3">
        <Skeleton width={36} height={36} borderRadius={12} />
        <div className="flex flex-col gap-1">
          <Skeleton width={120} height={16} />
          <Skeleton width={160} height={10} />
        </div>
      </div>
      {/* Dynamic content */}
      {children}
    </div>
  );
}
