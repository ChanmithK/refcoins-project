"use client";

import Image from "next/image";
import Link from "next/link";
import { Property } from "../../types/property";
import { MapPin, Home, Square, Heart, Eye } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
      {/* Property Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1.5 text-xs font-semibold rounded-full text-white backdrop-blur-sm ${
              property.status === "For Sale"
                ? "bg-emerald-500/90"
                : "bg-blue-500/90"
            }`}
          >
            {property.status}
          </span>
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* View Details Overlay */}
        <Link href={`/property/${property.slug}`}>
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Eye className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">
                View Details
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Property Details */}
      <Link href={`/property/${property.slug}`}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
              {property.title}
            </h3>
          </div>

          <div className="flex items-center text-gray-500 mb-4">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm font-medium">{property.location}</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center">
                <Home className="w-4 h-4 mr-1 text-purple-500" />
                <span className="text-sm">{property.type}</span>
              </div>
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1 text-orange-500" />
                <span className="text-sm">
                  {property.area.toLocaleString()} sq ft
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {formatPrice(property.price)}
            </div>
          </div>

          <p className="text-gray-600 text-sm mt-3 line-clamp-2 leading-relaxed">
            {property.description}
          </p>

          {/* Action Button */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors duration-200">
              View Property Details →
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
