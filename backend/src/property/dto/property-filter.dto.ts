import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class PropertyFilterDto {
  @IsOptional()
  @IsString()
  @IsEnum(['Colombo', 'Kandy', 'Galle'], {
    message: 'Location must be one of: Colombo, Kandy, Galle',
  })
  location?: string;

  @IsOptional()
  @IsString()
  @IsEnum(['For Sale', 'For Rent'], {
    message: 'Status must be one of: For Sale, For Rent',
  })
  status?: string;

  @IsOptional()
  @IsString()
  @IsEnum(['Single Family', 'Villa'], {
    message: 'Type must be one of: Single Family, Villa',
  })
  type?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Page must be at least 1' })
  @Transform(({ value }) => parseInt(value) || 1)
  page?: number = 1;

  @IsOptional()
  @IsNumber({}, { message: 'Limit must be a number' })
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit cannot exceed 100' })
  @Transform(({ value }) => parseInt(value) || 10)
  limit?: number = 10;
}
