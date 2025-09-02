"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropertyTable } from "@/components/admin/property-table";
import { Plus, Building2, Search, Filter } from "lucide-react";
import { useGetPropertiesQuery } from "@/store/api/propertyApi";

export default function PropertiesPage() {
  const {
    data: propertyData,
    isLoading,
    error,
  } = useGetPropertiesQuery({
    limit: 100,
  });

  const properties = propertyData?.data || [];
  const totalProperties = properties.length;

  // Calculate statistics with proper error handling
  const forSaleCount = properties.filter((property) => {
    const status = property?.status?.trim();
    return status === "For Sale";
  }).length;

  const forRentCount = properties.filter((property) => {
    const status = property?.status?.trim();
    return status === "For Rent";
  }).length;

  const activeListings = properties.filter((property) => {
    const status = property?.status?.trim();
    return status === "For Sale" || status === "For Rent";
  }).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center">
              <Building2 className="w-10 h-10 mr-3 text-blue-600" />
              Properties
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Manage your property listings and inventory
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="rounded-xl hover:scale-105 transition-transform duration-200"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button
              variant="outline"
              className="rounded-xl hover:scale-105 transition-transform duration-200"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Link href="/admin/properties/new">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Properties</p>
              <p className="text-2xl font-bold text-gray-900">
                {isLoading ? "-" : error ? "Error" : totalProperties}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">For Sale</p>
              <p className="text-2xl font-bold text-emerald-600">
                {isLoading ? "-" : error ? "Error" : forSaleCount}
              </p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">For Rent</p>
              <p className="text-2xl font-bold text-purple-600">
                {isLoading ? "-" : error ? "Error" : forRentCount}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Listings</p>
              <p className="text-2xl font-bold text-orange-600">
                {isLoading ? "-" : error ? "Error" : activeListings}
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <PropertyTable />
      </div>
    </div>
  );
}
