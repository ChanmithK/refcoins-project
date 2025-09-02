"use client";

import { LoadingSpinner } from "./loading-spinner";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingState({
  message = "Loading...",
  size = "lg",
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <LoadingSpinner size={size} />
      <p className="text-gray-600 mt-4">{message}</p>
    </div>
  );
}
