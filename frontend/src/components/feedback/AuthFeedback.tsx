import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

interface ErrorFeedbackState {
  type: "succes" | "error";
  message: string;
  title: string;
}

export function AuthFeedback({ message, title, type }: ErrorFeedbackState) {
  return (
    <div>
      {type === "error" ? (
        <Alert
          className="max-w-md animate-[slideDown_0.3s_ease-out] transition-all text-red-500"
        >
          <AlertCircleIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className="text-black">{message}</AlertDescription>
        </Alert>
      ) : (
        <Alert className="max-w-md text-green-400">
          <CheckCircle2Icon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription >
            {message}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
