"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Building2, TrendingUp, Eye, Users, MapPin } from "lucide-react";
import { useGetPropertiesQuery } from "@/store/api/propertyApi";

export default function AdminDashboard() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="space-y-8 p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-gray-600 mt-2 text-xl font-medium">
                  Welcome to your EstateHub Admin Panel
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Today
                </div>
                <div className="text-xl font-bold text-gray-900 mt-1">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Properties Card */}
          <div className="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {isLoading ? (
                      <div className="animate-pulse bg-gray-200 h-10 w-16 rounded"></div>
                    ) : error ? (
                      <span className="text-red-500 text-lg">Error</span>
                    ) : (
                      totalProperties
                    )}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Total Properties
              </h3>
              <p className="text-gray-500 text-sm">
                {isLoading
                  ? "Loading..."
                  : error
                  ? "Failed to load data"
                  : "Properties in your database"}
              </p>
            </div>
          </div>

          {/* For Sale Card */}
          <div className="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                    {isLoading ? (
                      <div className="animate-pulse bg-gray-200 h-10 w-16 rounded"></div>
                    ) : error ? (
                      <span className="text-red-500 text-lg">Error</span>
                    ) : (
                      forSaleCount
                    )}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">For Sale</h3>
              <p className="text-gray-500 text-sm">
                {isLoading
                  ? "Loading..."
                  : error
                  ? "Failed to load data"
                  : "Properties available for sale"}
              </p>
            </div>
          </div>

          {/* For Rent Card */}
          <div className="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {isLoading ? (
                      <div className="animate-pulse bg-gray-200 h-10 w-16 rounded"></div>
                    ) : error ? (
                      <span className="text-red-500 text-lg">Error</span>
                    ) : (
                      forRentCount
                    )}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">For Rent</h3>
              <p className="text-gray-500 text-sm">
                {isLoading
                  ? "Loading..."
                  : error
                  ? "Failed to load data"
                  : "Properties available for rent"}
              </p>
            </div>
          </div>

          {/* Total Views Card */}
          <div className="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-gray-400">-</div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Total Views
              </h3>
              <p className="text-gray-500 text-sm">
                Coming soon - Analytics tracking
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Quick Actions
                </h3>
              </div>
              <div className="space-y-3 flex  flex-col">
                <Link href="/admin/properties/new">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-2xl py-6 px-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-white/30 transition-colors duration-300">
                      <Plus className="w-5 h-5" />
                    </div>
                    Add New Property
                  </Button>
                </Link>
                <Link href="/admin/properties">
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-2xl py-6 px-6 text-lg font-semibold border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    Manage Properties
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-2xl py-6 px-6 text-lg font-semibold border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:scale-105 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors duration-300">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  View Analytics
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <Building2 className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-700 mb-2">
                    No recent activity
                  </h4>
                  <p className="text-gray-500 text-lg mb-4">
                    Activity will appear here when you start managing properties
                  </p>
                  <Link href="/admin/properties/new">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Getting Started */}
        <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Getting Started Guide
            </h3>
            <p className="text-gray-600 text-lg">
              Follow these steps to set up your property management system
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Add Properties
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Start by adding your first property listing with photos,
                details, and pricing information
              </p>
            </div>

            <div className="group text-center p-8 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-3xl border border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Manage Listings
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Edit and update your property information, manage availability,
                and organize your inventory
              </p>
            </div>

            <div className="group text-center p-8 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-3xl border border-orange-100 hover:border-orange-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Track Performance
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Monitor property views, engagement metrics, and analyze your
                listing performance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
