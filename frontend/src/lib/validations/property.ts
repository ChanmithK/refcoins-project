import { z } from "zod";

export const propertySchema = z.object({
  title: z
    .string()
    .min(1, "Property title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title cannot exceed 100 characters")
    .trim(),

  image: z
    .string()
    .min(1, "Property image is required")
    .refine((val) => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, "Please provide a valid image URL"),

  slug: z
    .string()
    .min(1, "Property slug is required")
    .min(3, "Slug must be at least 3 characters long")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),

  location: z.enum(["Colombo", "Kandy", "Galle"], {
    message: "Please select a valid location",
  }),

  description: z
    .string()
    .min(1, "Property description is required")
    .min(20, "Description must be at least 20 characters long")
    .max(1000, "Description cannot exceed 1000 characters")
    .trim(),

  price: z
    .number({
      message: "Price must be a valid number",
    })
    .min(1, "Price must be greater than 0")
    .max(1000000000, "Price cannot exceed 1 billion LKR"),

  type: z.enum(["Single Family", "Villa"], {
    message: "Please select a valid property type",
  }),

  status: z.enum(["For Sale", "For Rent"], {
    message: "Please select a property status",
  }),

  area: z
    .number({
      message: "Area must be a valid number",
    })
    .min(1, "Area must be greater than 0 sq ft")
    .max(100000, "Area cannot exceed 100,000 sq ft"),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
