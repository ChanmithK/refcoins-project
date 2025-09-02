import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Property } from "../../types/property";

interface PropertyFilters {
  location: string;
  status: string;
  type: string;
  search: string;
}

interface PropertyState {
  items: Property[];
  loading: boolean;
  error: string | null;
  filters: PropertyFilters;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

const initialState: PropertyState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    location: "",
    status: "",
    type: "",
    search: "",
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<PropertyFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; // Reset to first page when filters change
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setFilters,
  setCurrentPage,
  clearFilters,
  setLoading,
  setError,
} = propertySlice.actions;

export default propertySlice.reducer;
