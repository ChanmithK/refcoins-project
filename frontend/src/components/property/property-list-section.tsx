"use client";

import { useEffect } from "react";
import { PropertyGrid } from "./property-grid";
import { Pagination } from "@/components/ui/pagination";
import { ErrorState } from "@/components/ui/error-state";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentPage } from "@/store/slices/propertySlice";
import { useGetPropertiesQuery } from "@/store/api/propertyApi";

interface PropertyFilters {
  location: string;
  status: string;
  type: string;
  search: string;
}

interface PropertyState {
  filters: PropertyFilters;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export function PropertyListSection() {
  const dispatch = useAppDispatch();
  const propertyState = useAppSelector(
    (state) => state.property
  ) as PropertyState;
  const filters = propertyState?.filters || {
    location: "",
    status: "",
    type: "",
    search: "",
  };
  const pagination = propertyState?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  };

  // Build query parameters
  const queryParams = {
    page: pagination.currentPage,
    limit: pagination.itemsPerPage,
    // Only include non-empty filters
    ...(filters.location && { location: filters.location }),
    ...(filters.status && { status: filters.status }),
    ...(filters.type && { type: filters.type }),
    ...(filters.search && { search: filters.search }),
  };

  const {
    data: propertyData,
    isLoading,
    error,
    refetch,
  } = useGetPropertiesQuery(queryParams);

  // Update Redux state when API data changes
  useEffect(() => {
    if (propertyData?.pagination) {
      // We could dispatch actions to sync pagination state if needed
      // For now, we'll use the API response directly
    }
  }, [propertyData, dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorState
          title="Error loading properties"
          message="We couldn't load the properties. Please check your connection and try again."
          onRetry={refetch}
        />
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          Premium Collection
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Featured Properties
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover exceptional homes handpicked by our experts for their unique
          charm and prime locations
        </p>
      </div>

      <PropertyGrid properties={propertyData?.data || []} loading={isLoading} />

      {!isLoading && propertyData && (
        <div className="mt-16">
          {(() => {
            const currentPage =
              propertyData.pagination?.currentPage || pagination.currentPage;
            const totalPages =
              propertyData.pagination?.totalPages ||
              Math.max(
                1,
                Math.ceil(
                  (propertyData.data?.length || 0) / pagination.itemsPerPage
                )
              );
            const totalItems =
              propertyData.pagination?.totalItems ||
              propertyData.data?.length ||
              0;

            // Always show pagination bar, even with 1 page
            return (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                onPageChange={handlePageChange}
              />
            );
          })()}
        </div>
      )}
    </section>
  );
}
