import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyFilterDto } from './dto/property-filter.dto';

// Properties API base route
@Controller('api/properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    return await this.propertyService.create(createPropertyDto);
  }

  // Get all properties
  @Get()
  async findAll(@Query() filterDto: PropertyFilterDto) {
    return await this.propertyService.findAll(filterDto);
  }

  // Get property by slug
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return await this.propertyService.findBySlug(slug);
  }

  // Get a property by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.propertyService.findOne(id);
  }

  // Update a property by ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return await this.propertyService.update(id, updatePropertyDto);
  }

  // Delete a property by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.propertyService.remove(id);
    return { message: 'Property deleted successfully' };
  }
}
