"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addNotification } from "@/store/slices/uiSlice";

interface ApiError {
  status: number | string;
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
  };
}

export function useErrorHandler() {
  const dispatch = useAppDispatch();

  const handleError = (error: ApiError | unknown) => {
    let message = "An unexpected error occurred";

    if (error && typeof error === "object" && "data" in error) {
      const apiError = error as ApiError;
      if (apiError.data?.message) {
        message = apiError.data.message;
      } else if (apiError.data?.errors) {
        // Handle validation errors
        const validationErrors = Object.values(apiError.data.errors).flat();
        message = validationErrors.join(", ");
      }
    } else if (error && typeof error === "object" && "message" in error) {
      message = (error as { message: string }).message;
    } else if (typeof error === "string") {
      message = error;
    }

    dispatch(
      addNotification({
        type: "error",
        message,
        duration: 6000,
      })
    );
  };

  const handleSuccess = (message: string) => {
    dispatch(
      addNotification({
        type: "success",
        message,
        duration: 4000,
      })
    );
  };

  return { handleError, handleSuccess };
}

// Global error handler for unhandled promise rejections
export function GlobalErrorHandler() {
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      handleError(event.reason);
    };

    const handleError = (event: ErrorEvent) => {
      console.error("Global error:", event.error);
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
      window.removeEventListener("error", handleError);
    };
  }, [handleError]);

  return null;
}
