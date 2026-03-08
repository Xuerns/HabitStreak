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
  return (
    <div className="animate-[slideLeft_0.5s_ease-out] transition-all">
      {type === "error" ? (
        <div className="bg-white px-3 py-0.5 rounded-sm border-l-3 border-l-red-500">
          <h3 className="text-gray-500">{title}</h3>
          <span className="text-sm text-gray-400">{message}</span>
        </div>
      ) : (
        <div className="bg-white px-3 py-1 rounded-sm border-l-4 border-l-green-500">
          <h3 className="text-gray-500">{title}</h3>
          <span className="text-sm text-gray-400">{message}</span>
        </div>
      )}
    </div>
  );
}
