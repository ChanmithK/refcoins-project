"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilters } from "@/store/slices/propertySlice";
import { Search, MapPin, Home, Filter, X } from "lucide-react";

interface PropertyState {
  filters: {
    location: string;
    status: string;
    type: string;
    search: string;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export function SearchFilters() {
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

  const [localFilters, setLocalFilters] = useState({
    location: filters.location,
    status: filters.status,
    type: filters.type,
    search: filters.search,
  });

  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    dispatch(setFilters(localFilters));
  };

  const handleClear = () => {
    const clearedFilters = {
      location: "",
      status: "",
      type: "",
      search: "",
    };
    setLocalFilters(clearedFilters);
    dispatch(setFilters(clearedFilters));
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">
          Find Your Perfect Property
        </h3>
      </div>

      {/* Single Row Layout */}
      <div className="flex flex-wrap items-end gap-4">
        {/* Location Filter */}
        <div className="flex-1 min-w-[160px]">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 mr-1 text-blue-600" />
            Location
          </label>
          <Select
            value={localFilters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="w-full h-11 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
          >
            <option value="">All Locations</option>
            <option value="Colombo">Colombo</option>
            <option value="Kandy">Kandy</option>
            <option value="Galle">Galle</option>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="flex-1 min-w-[140px]">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Home className="w-4 h-4 mr-1 text-green-600" />
            Status
          </label>
          <Select
            value={localFilters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full h-11 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
          >
            <option value="">All Status</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </Select>
        </div>

        {/* Type Filter */}
        <div className="flex-1 min-w-[160px]">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Home className="w-4 h-4 mr-1 text-purple-600" />
            Property Type
          </label>
          <Select
            value={localFilters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="w-full h-11 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
          >
            <option value="">All Types</option>
            <option value="Single Family">Single Family</option>
            <option value="Villa">Villa</option>
          </Select>
        </div>

        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Search className="w-4 h-4 mr-1 text-orange-600" />
            Search
          </label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search properties..."
              value={localFilters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full h-11 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 pl-10 transition-all duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 ml-2">
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 h-11 font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 whitespace-nowrap"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            className="rounded-xl px-4 h-11 border-gray-300 hover:border-gray-400 transition-all duration-200 hover:scale-105 whitespace-nowrap"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
