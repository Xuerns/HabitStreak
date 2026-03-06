import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface ErrorFeedbackState {
    message: string;
    title: string;
}

export function ErrorFeedback({message, title}: ErrorFeedbackState) {
  return (
    <Alert
      variant="destructive"
      className="max-w-md animate-[slideDown_0.3s_ease-out] transition-all"
    >
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
}
