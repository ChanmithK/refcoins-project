import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Property,
  PropertyListResponse,
  CreatePropertyDto,
  UpdatePropertyDto,
  PropertyFilterDto,
} from "../../types/property";

export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Property"],
  endpoints: (builder) => ({
    // Get Properties
    getProperties: builder.query<PropertyListResponse, PropertyFilterDto>({
      query: (filters) => ({
        url: "/properties",
        params: filters,
      }),
      providesTags: ["Property"],
    }),

    // Get Property
    getProperty: builder.query<Property, string>({
      query: (id) => `/properties/${id}`,
      providesTags: (result, error, id) => [{ type: "Property", id }],
    }),

    // Get Property By Slug
    getPropertyBySlug: builder.query<Property, string>({
      query: (slug) => `/properties/slug/${slug}`,
      providesTags: (result, error, slug) => [
        { type: "Property", id: result?._id },
      ],
    }),

    // Create Property
    createProperty: builder.mutation<Property, CreatePropertyDto>({
      query: (property) => ({
        url: "/properties",
        method: "POST",
        body: property,
      }),
      invalidatesTags: ["Property"],
    }),

    // Update Property
    updateProperty: builder.mutation<
      Property,
      { id: string; property: UpdatePropertyDto }
    >({
      query: ({ id, property }) => ({
        url: `/properties/${id}`,
        method: "PATCH",
        body: property,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Property", id },
        "Property",
      ],
    }),
    // Delete Property
    deleteProperty: builder.mutation<void, string>({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Property"],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useGetPropertyBySlugQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertyApi;
