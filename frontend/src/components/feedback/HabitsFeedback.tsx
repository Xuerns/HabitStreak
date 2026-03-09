import { useEffect, useState } from "react";
import "@/animation.css";

interface HabitsFeedbackProps {
  title: string;
  message: string;
  type: string;
}

export default function HabitsFeedback({
  title,
  message,
  type,
}: HabitsFeedbackProps) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Mulai animasi keluar 400ms sebelum komponen dihapus
    const leaveTimer = setTimeout(() => {
      setIsLeaving(true);
    }, 1600);

    return () => clearTimeout(leaveTimer);
  }, []);

  const animationClass = isLeaving
    ? "animate-[habitSlideOut_0.4s_ease-in_forwards]"
    : "animate-[habitSlideIn_0.4s_ease-out_forwards]";

  return (
    <div className={`${animationClass} min-w-60 max-w-72`}>
      {type === "error" ? (
        <div className="bg-white px-4 py-2.5 rounded-md border-l-4 border-l-red-500 shadow-md shadow-red-100">
          <h3 className="text-gray-700 font-medium text-sm">{title}</h3>
          <span className="text-xs text-gray-400">{message}</span>
        </div>
      ) : (
        <div className="bg-white px-4 py-2.5 rounded-md border-l-4 border-l-green-500 shadow-md shadow-green-100">
          <h3 className="text-gray-700 font-medium text-sm">{title}</h3>
          <span className="text-xs text-gray-400">{message}</span>
        </div>
      )}
    </div>
  );
}
