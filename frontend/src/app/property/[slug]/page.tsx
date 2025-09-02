"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Home,
  Square,
  Heart,
  Share2,
  Phone,
  Calendar,
  Copy,
  Check,
  Star,
  Bath,
  Bed,
  Car,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { useGetPropertyBySlugQuery } from "@/store/api/propertyApi";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    data: property,
    isLoading: loading,
    error,
  } = useGetPropertyBySlugQuery(slug, {
    skip: !slug,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-96 bg-gray-200 rounded-2xl"></div>
                <div className="h-48 bg-gray-200 rounded-2xl"></div>
              </div>
              <div className="space-y-6">
                <div className="h-64 bg-gray-200 rounded-2xl"></div>
                <div className="h-48 bg-gray-200 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || (!loading && !property)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[500px]">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Home className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Property Not Found
            </h1>
            <p className="text-gray-600 mb-8 text-center max-w-md text-lg">
              {error
                ? "Failed to load property details. Please try again later."
                : "The property you are looking for could not be found. It may have been removed or the link is incorrect."}
            </p>
            <div className="flex space-x-4">
              <Button onClick={() => router.back()} variant="outline" size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Browse Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />

      {/* Property Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="rounded-xl hover:scale-105 transition-transform duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="text-lg">{property.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
                  }`}
                />
              </button>
              <Badge
                variant={
                  property.status === "For Sale" ? "default" : "secondary"
                }
                className={`text-sm px-4 py-2 rounded-full ${
                  property.status === "For Sale"
                    ? "bg-emerald-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {property.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <Square className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                <div className="text-2xl font-bold text-gray-900">
                  {property.area.toLocaleString()}
                </div>
                <div className="text-gray-600 text-sm">sq ft</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <Home className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                <div className="text-2xl font-bold text-gray-900">
                  {property.type}
                </div>
                <div className="text-gray-600 text-sm">Property Type</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <Star className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <div className="text-gray-600 text-sm">Rating</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-green-500" />
                <div className="text-2xl font-bold text-gray-900">
                  {property.location}
                </div>
                <div className="text-gray-600 text-sm">Location</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About This Property
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {property.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price and Actions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {formatPrice(property.price)}
                </div>
                <div className="text-gray-600">Total Price</div>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  size="lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Agent
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-xl py-3 text-lg font-semibold border-2 hover:scale-105 transition-transform duration-200"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Viewing
                </Button>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Property Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Property ID</span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {property._id.slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold">{property.location}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-semibold">{property.type}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Status</span>
                  <Badge
                    className={
                      property.status === "For Sale"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-blue-100 text-blue-700"
                    }
                  >
                    {property.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Area</span>
                  <span className="font-semibold">
                    {property.area.toLocaleString()} sq ft
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Listed</span>
                  <span className="font-semibold">
                    {new Date(property.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Share This Property
              </h3>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-xl hover:scale-105 transition-transform duration-200"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-xl hover:scale-105 transition-transform duration-200"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Similar Properties
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Discover more exceptional properties in {property.location} and
              similar {property.type.toLowerCase()} properties.
            </p>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl hover:scale-105 transition-transform duration-200"
              >
                Browse All Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
