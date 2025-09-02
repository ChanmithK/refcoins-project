import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      className={cn("flex items-center text-sm text-red-600 mt-1", className)}
    >
      <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
