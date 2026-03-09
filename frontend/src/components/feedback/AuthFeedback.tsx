import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import "@/animation.css";

interface ErrorFeedbackState {
  type: "succes" | "error";
  message: string;
  title: string;
}

export function AuthFeedback({ message, title, type }: ErrorFeedbackState) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Mulai animasi keluar 400ms sebelum komponen dihapus (timeout di parent = 2000ms)
    const leaveTimer = setTimeout(() => {
      setIsLeaving(true);
    }, 1600);

    return () => clearTimeout(leaveTimer);
  }, []);

  const animationClass = isLeaving
    ? "animate-[authSlideOut_0.4s_ease-in_forwards]"
    : "animate-[authSlideIn_0.4s_ease-out_forwards]";

  return (
    <div className={animationClass}>
      {type === "error" ? (
        <Alert className="max-w-md text-red-500 shadow-lg shadow-red-100">
          <AlertCircleIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className="text-black">{message}</AlertDescription>
        </Alert>
      ) : (
        <Alert className="max-w-md text-green-500 shadow-lg shadow-green-100">
          <CheckCircle2Icon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className="text-black">{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
