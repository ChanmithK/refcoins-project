import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyFilterDto } from './dto/property-filter.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  // Create a new property
  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    try {
      const createdProperty = new this.propertyModel(createPropertyDto);
      return await createdProperty.save();
    } catch (error) {
      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyPattern)[0];
        if (duplicateField === 'slug') {
          throw new ConflictException(
            `Property with slug '${createPropertyDto.slug}' already exists`,
          );
        }
      }
      throw new InternalServerErrorException('Failed to create property');
    }
  }

  // Search for properties with filters and pagination
  async findAll(filterDto: PropertyFilterDto) {
    try {
      const {
        location,
        status,
        type,
        search,
        page = 1,
        limit = 10,
      } = filterDto;

      const filter: any = {};

      if (location) filter.location = location;
      if (status) filter.status = status;
      if (type) filter.type = type;
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      const skip = (page - 1) * limit;

      const [data, totalItems] = await Promise.all([
        this.propertyModel
          .find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .exec(),
        this.propertyModel.countDocuments(filter).exec(),
      ]);

      const totalPages = Math.ceil(totalItems / limit);

      return {
        data,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
          itemsPerPage: limit,
        },
        filters: {
          location,
          status,
          type,
          search,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to search properties');
    }
  }

  // Find property by slug
  async findBySlug(slug: string): Promise<Property> {
    try {
      const property = await this.propertyModel.findOne({ slug }).exec();
      if (!property) {
        throw new NotFoundException(`Property with slug '${slug}' not found`);
      }
      return property;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to retrieve property by slug',
      );
    }
  }

  // Find property by ID
  async findOne(id: string): Promise<Property> {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new NotFoundException(`Property with ID '${id}' not found`);
      }

      const property = await this.propertyModel.findById(id).exec();
      if (!property) {
        throw new NotFoundException(`Property with ID '${id}' not found`);
      }

      return property;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve property');
    }
  }

  // Update property by ID
  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new NotFoundException(`Property with ID '${id}' not found`);
      }

      const updatedProperty = await this.propertyModel
        .findByIdAndUpdate(id, updatePropertyDto, { new: true })
        .exec();

      if (!updatedProperty) {
        throw new NotFoundException(`Property with ID '${id}' not found`);
      }

      return updatedProperty;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyPattern)[0];
        if (duplicateField === 'slug') {
          throw new ConflictException(
            `Property with slug '${updatePropertyDto.slug || 'unknown'}' already exists`,
          );
        }
      }

      throw new InternalServerErrorException('Failed to update property');
    }
  }

  // Remove property by ID
  async remove(id: string): Promise<void> {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new NotFoundException(`Property with ID '${id}' not found`);
      }

      const result = await this.propertyModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Property with ID '${id}' not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete property');
    }
  }
}
