"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { NotificationContainer } from "@/components/ui/notification";
import { GlobalErrorHandler } from "@/components/error-handler";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <GlobalErrorHandler />
      {children}
      <NotificationContainer />
    </Provider>
  );
}
