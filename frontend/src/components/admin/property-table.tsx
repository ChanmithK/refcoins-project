"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import {
  useGetPropertiesQuery,
  useDeletePropertyMutation,
} from "@/store/api/propertyApi";
import { useErrorHandler } from "@/components/error-handler";
import { Property } from "@/types/property";

interface DeleteModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

function DeleteModal({
  property,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: DeleteModalProps) {
  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Delete Property
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete &quot;{property.title}&quot;? This
          action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="sm" /> : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PropertyTable() {
  const { handleError, handleSuccess } = useErrorHandler();
  const [deleteProperty, { isLoading: isDeleting }] =
    useDeletePropertyMutation();
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    data: propertyData,
    isLoading,
    error,
    refetch,
  } = useGetPropertiesQuery({ limit: 100 });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleDeleteClick = (property: Property) => {
    setPropertyToDelete(property);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!propertyToDelete) return;

    try {
      await deleteProperty(propertyToDelete._id).unwrap();
      handleSuccess("Property deleted successfully!");
      setIsDeleteModalOpen(false);
      setPropertyToDelete(null);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setPropertyToDelete(null);
  };

  if (isLoading) {
    return <LoadingState message="Loading properties..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Error loading properties"
        message="We couldn't load the properties. Please check your connection and try again."
        onRetry={refetch}
      />
    );
  }

  const properties = propertyData?.data || [];

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No properties found</div>
        <Link href="/admin/properties/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
            Add Your First Property
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Area
                </th>
                <th className="px-8 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {properties.map((property, index) => (
                <tr
                  key={property._id}
                  className={`hover:bg-gray-50 transition-colors duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16">
                        <Image
                          src={property.image}
                          alt={property.title}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-xl object-cover shadow-md"
                        />
                      </div>
                      <div className="ml-6">
                        <div className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">
                          {property.title}
                        </div>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md font-mono">
                          {property.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-gray-900">
                        {property.location}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="text-sm text-gray-900 bg-gray-100 px-3 py-1 rounded-full font-medium">
                      {property.type}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        property.status === "For Sale"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-blue-100 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">
                      {formatPrice(property.price)}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="text-sm text-gray-900 font-medium">
                      {property.area.toLocaleString()} sq ft
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/admin/properties/${property._id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg hover:scale-105 transition-transform duration-200"
                        >
                          View
                        </Button>
                      </Link>
                      <Link href={`/admin/properties/${property._id}/edit`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg hover:scale-105 transition-transform duration-200"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(property)}
                        className="rounded-lg hover:scale-105 transition-transform duration-200"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        property={propertyToDelete}
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </>
  );
}
