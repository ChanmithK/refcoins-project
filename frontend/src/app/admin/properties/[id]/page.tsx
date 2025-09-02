"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  MapPin,
  Home,
  DollarSign,
  Square,
  Calendar,
  Hash,
  Eye,
  Share2,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useGetPropertyQuery } from "@/store/api/propertyApi";

export default function PropertyViewPage() {
  const params = useParams();
  const router = useRouter();

  const {
    data: property,
    isLoading: loading,
    error: queryError,
  } = useGetPropertyQuery(params.id as string, {
    skip: !params.id,
  });

  const error = queryError ? "Failed to load property" : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div
              className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-purple-400 rounded-full animate-spin mx-auto"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Property
          </h2>
          <p className="text-gray-500">
            Please wait while we fetch the property details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Home className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {error ||
              "The requested property could not be found. It may have been deleted or the URL is incorrect."}
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => router.back()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
            <Link href="/admin/properties">
              <Button
                variant="outline"
                className="w-full rounded-2xl py-3 font-semibold border-2 hover:scale-105 transition-transform duration-200"
              >
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 py-8">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="rounded-2xl px-6 py-3 font-semibold border-2 hover:scale-105 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Property Details
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  Viewing property information and settings
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="rounded-2xl px-6 py-3 font-semibold border-2 hover:scale-105 transition-all duration-200 hover:border-green-300 hover:bg-green-50"
              >
                <Eye className="w-5 h-5 mr-2" />
                Preview
              </Button>
              <Link href={`/admin/properties/${property._id}/edit`}>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Property
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Property Image - Enhanced */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="relative aspect-video group">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    size="sm"
                    className="bg-white/90 hover:bg-white text-gray-700 rounded-xl shadow-lg backdrop-blur-sm"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-white/90 hover:bg-white text-gray-700 rounded-xl shadow-lg backdrop-blur-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge
                    className={`text-white font-semibold px-4 py-2 rounded-xl shadow-lg ${
                      property.status === "For Sale"
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {property.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Property Information - Enhanced */}
          <div className="space-y-6">
            {/* Main Info Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {property.title}
                </h2>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="text-lg font-medium">
                    {property.location}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Price */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-6 h-6 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                      Price
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-blue-700">
                    LKR {property.price.toLocaleString()}
                  </div>
                </div>

                {/* Property Type */}
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100">
                  <div className="flex items-center mb-2">
                    <Home className="w-6 h-6 text-emerald-600 mr-2" />
                    <span className="text-sm font-medium text-emerald-600 uppercase tracking-wide">
                      Type
                    </span>
                  </div>
                  <div className="text-xl font-bold text-emerald-700">
                    {property.type}
                  </div>
                </div>

                {/* Area */}
                <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                  <div className="flex items-center mb-2">
                    <Square className="w-6 h-6 text-purple-600 mr-2" />
                    <span className="text-sm font-medium text-purple-600 uppercase tracking-wide">
                      Area
                    </span>
                  </div>
                  <div className="text-xl font-bold text-purple-700">
                    {property.area.toLocaleString()} sq ft
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description and Metadata - Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Description */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Description</h3>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {property.description}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4">
                <Hash className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Property Information
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-gray-600 font-medium">Property ID:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm bg-white px-3 py-1 rounded-lg border">
                    {property._id}
                  </span>
                  <Button size="sm" variant="ghost" className="p-2">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-gray-600 font-medium">Slug:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm bg-white px-3 py-1 rounded-lg border">
                    {property.slug}
                  </span>
                  <Button size="sm" variant="ghost" className="p-2">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-gray-600 font-medium">Created:</span>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">
                    {new Date(property.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-gray-600 font-medium">Last Updated:</span>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">
                    {new Date(property.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
