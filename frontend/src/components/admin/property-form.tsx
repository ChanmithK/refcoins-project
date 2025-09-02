"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { ErrorMessage } from "@/components/ui/error-message";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { propertySchema, PropertyFormData } from "@/lib/validations/property";
import {
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
} from "@/store/api/propertyApi";
import { useErrorHandler } from "@/components/error-handler";
import { Property } from "@/types/property";
import { AlertTriangle, X } from "lucide-react";
import { useState, useEffect } from "react";

interface PropertyFormProps {
  property?: Property;
  onSuccess?: () => void;
}

export function PropertyForm({ property, onSuccess }: PropertyFormProps) {
  const { handleError, handleSuccess } = useErrorHandler();
  const [createProperty, { isLoading: isCreating }] =
    useCreatePropertyMutation();
  const [updateProperty, { isLoading: isUpdating }] =
    useUpdatePropertyMutation();
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  const isEditing = !!property;
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setValue,
    watch,
    reset,
    trigger,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    mode: "onChange",
    defaultValues: property
      ? {
          title: property.title,
          image: property.image,
          slug: property.slug,
          location: property.location,
          description: property.description,
          price: property.price,
          type: property.type,
          status: property.status,
          area: property.area,
        }
      : {
          title: "",
          image: "",
          slug: "",
          location: "Colombo",
          description: "",
          price: 0,
          type: "Single Family",
          status: "For Sale",
          area: 0,
        },
  });

  // Show validation alert when there are errors after form submission
  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      setShowValidationAlert(true);
    } else {
      setShowValidationAlert(false);
    }
  }, [errors, isSubmitted]);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue("title", title);
    if (!isEditing) {
      setValue("slug", generateSlug(title));
      await trigger("slug");
    }
    await trigger("title");
  };

  const getFieldClassName = (
    fieldName: keyof PropertyFormData,
    baseClassName: string
  ) => {
    const hasError = errors[fieldName];
    return `${baseClassName} ${
      hasError
        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
    }`;
  };

  const getErrorCount = () => Object.keys(errors).length;

  const onSubmit = async (data: PropertyFormData) => {
    try {
      console.log("Form data being submitted:", data);
      console.log("Data types:", {
        title: typeof data.title,
        price: typeof data.price,
        area: typeof data.area,
        image: typeof data.image,
        slug: typeof data.slug,
        location: typeof data.location,
        description: typeof data.description,
        type: typeof data.type,
        status: typeof data.status,
      });

      if (isEditing && property) {
        await updateProperty({
          id: property._id,
          property: data,
        }).unwrap();

        handleSuccess("Property updated successfully!");
      } else {
        await createProperty(data).unwrap();

        handleSuccess("Property created successfully!");

        reset();
      }

      onSuccess?.();
    } catch (error: unknown) {
      console.error("Form submission error:", error);
      handleError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Validation Alert */}
      {showValidationAlert && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-red-800">
                Please fix the following {getErrorCount()} error
                {getErrorCount() !== 1 ? "s" : ""}:
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc list-inside space-y-1">
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field}>
                      <span className="font-medium capitalize">
                        {field.replace(/([A-Z])/g, " $1")}
                      </span>
                      : {error?.message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={() => setShowValidationAlert(false)}
                  className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {isEditing ? "Edit Property" : "Add New Property"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Title *
            </label>
            <Input
              {...register("title")}
              onChange={handleTitleChange}
              placeholder="Enter property title"
              disabled={isLoading}
              className={getFieldClassName("title", "h-11")}
            />
            <ErrorMessage message={errors.title?.message} />
          </div>

          {/* Property Slug */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Slug *
            </label>
            <Input
              {...register("slug")}
              placeholder="property-slug"
              disabled={isLoading}
              className={getFieldClassName("slug", "h-11 font-mono text-sm")}
            />
            <ErrorMessage message={errors.slug?.message} />
            <p className="text-xs text-gray-500 mt-1">
              URL-friendly version of the title (lowercase, hyphens only)
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <Select
              {...register("location")}
              disabled={isLoading}
              className={getFieldClassName("location", "h-11")}
            >
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
              <option value="Galle">Galle</option>
            </Select>
            <ErrorMessage message={errors.location?.message} />
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type *
            </label>
            <Select
              {...register("type")}
              disabled={isLoading}
              className={getFieldClassName("type", "h-11")}
            >
              <option value="Single Family">Single Family</option>
              <option value="Villa">Villa</option>
            </Select>
            <ErrorMessage message={errors.type?.message} />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (LKR) *
            </label>
            <Input
              type="number"
              {...register("price", { valueAsNumber: true })}
              placeholder="5000000"
              min="0"
              step="1000"
              disabled={isLoading}
              className={getFieldClassName("price", "h-11")}
            />
            <ErrorMessage message={errors.price?.message} />
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area (sq ft) *
            </label>
            <Input
              type="number"
              {...register("area", { valueAsNumber: true })}
              placeholder="2500"
              min="1"
              disabled={isLoading}
              className={getFieldClassName("area", "h-11")}
            />
            <ErrorMessage message={errors.area?.message} />
          </div>

          {/* Property Status */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Status *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  {...register("status")}
                  value="For Sale"
                  className="mr-2 w-4 h-4 text-blue-600"
                  disabled={isLoading}
                />
                <span className="text-sm font-medium text-gray-700">
                  For Sale
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  {...register("status")}
                  value="For Rent"
                  className="mr-2 w-4 h-4 text-blue-600"
                  disabled={isLoading}
                />
                <span className="text-sm font-medium text-gray-700">
                  For Rent
                </span>
              </label>
            </div>
            <ErrorMessage message={errors.status?.message} />
          </div>

          {/* Property Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Description *
            </label>
            <Textarea
              {...register("description")}
              rows={4}
              placeholder="Enter detailed property description"
              disabled={isLoading}
              className={getFieldClassName("description", "")}
            />
            <ErrorMessage message={errors.description?.message} />
          </div>

          {/* Property Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Image *
            </label>
            <ImageUpload
              value={watch("image")}
              onChange={(url) => setValue("image", url)}
              disabled={isLoading}
            />
            <ErrorMessage message={errors.image?.message} />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t mt-6">
          <Button
            type="submit"
            disabled={isLoading}
            variant="default"
            className="min-w-[140px] h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : isEditing ? (
              "Update Property"
            ) : (
              "Create Property"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
