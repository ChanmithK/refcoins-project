export interface Property {
  _id: string;
  title: string;
  image: string;
  slug: string;
  location: "Colombo" | "Kandy" | "Galle";
  description: string;
  price: number;
  type: "Single Family" | "Villa";
  status: "For Sale" | "For Rent";
  area: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyDto {
  title: string;
  image: string;
  slug: string;
  location: string;
  description: string;
  price: number;
  type: string;
  status: string;
  area: number;
}

export type UpdatePropertyDto = Partial<CreatePropertyDto>;

export interface PropertyFilterDto {
  location?: string;
  status?: string;
  type?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PropertyListResponse {
  data: Property[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  filters: {
    location?: string;
    status?: string;
    type?: string;
    search?: string;
  };
}
