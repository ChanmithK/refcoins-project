import { configureStore } from "@reduxjs/toolkit";
import { propertyApi } from "./api/propertyApi";
import propertySlice from "./slices/propertySlice";
import uiSlice from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    property: propertySlice,
    ui: uiSlice,
    [propertyApi.reducerPath]: propertyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(propertyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
