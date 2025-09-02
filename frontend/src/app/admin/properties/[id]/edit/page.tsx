"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PropertyForm } from "@/components/admin/property-form";
import {
  useGetPropertyQuery,
  useDeletePropertyMutation,
} from "@/store/api/propertyApi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";

interface EditPropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditPropertyPage({ params }: EditPropertyPageProps) {
  const router = useRouter();
  const { id } = React.use(params);
  const { data: property, isLoading, error } = useGetPropertyQuery(id);
  const [deleteProperty, { isLoading: deleting }] = useDeletePropertyMutation();

  const handleSuccess = () => {
    router.push("/admin/properties");
  };

  const handleDelete = async () => {
    if (
      !property ||
      !confirm(
        "Are you sure you want to delete this property? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deleteProperty(property._id).unwrap();
      router.push("/admin/properties");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete property");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-2">Property not found</div>
        <div className="text-gray-500">
          The property you&apos;re looking for doesn&apos;t exist.
        </div>
        <Button onClick={() => router.back()} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.back()} size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
            <p className="text-gray-600">
              Update &quot;{property.title}&quot; details
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/admin/properties/${property._id}`}>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </Link>
          <Link href={`/property/${property.slug}`} target="_blank">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>

      {/* Property Info Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{property.title}</h3>
            <p className="text-sm text-gray-600">
              {property.location} • {property.type}
            </p>
            <div className="flex items-center space-x-3 mt-1">
              <span className="font-semibold text-blue-600">
                LKR {property.price.toLocaleString()}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">
                {property.area.toLocaleString()} sq ft
              </span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  property.status === "For Sale"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {property.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <PropertyForm property={property} onSuccess={handleSuccess} />
    </div>
  );
}
