"use client";

import { useRouter } from "next/navigation";
import { PropertyForm } from "@/components/admin/property-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NewPropertyPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/properties");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => router.back()} size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
          <p className="text-gray-600">Create a new property listing</p>
        </div>
      </div>

      <PropertyForm onSuccess={handleSuccess} />
    </div>
  );
}
