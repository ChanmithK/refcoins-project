import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsUrl,
  MinLength,
  MaxLength,
  Min,
  Max,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(100, { message: 'Title must be less than 100 characters' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Image URL is required' })
  @IsUrl({}, { message: 'Image must be a valid URL' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: 'Slug is required' })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must be lowercase letters, numbers, and hyphens only',
  })
  slug: string;

  @IsString()
  @IsNotEmpty({ message: 'Location is required' })
  @IsEnum(['Colombo', 'Kandy', 'Galle'], {
    message: 'Location must be one of: Colombo, Kandy, Galle',
  })
  location: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  @MaxLength(1000, { message: 'Description must be less than 1000 characters' })
  description: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(1, { message: 'Price must be greater than 0' })
  @Max(1000000000, { message: 'Price is too high' })
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'Property type is required' })
  @IsEnum(['Single Family', 'Villa'], {
    message: 'Property type must be one of: Single Family, Villa',
  })
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'Property status is required' })
  @IsEnum(['For Sale', 'For Rent'], {
    message: 'Property status must be one of: For Sale, For Rent',
  })
  status: string;

  @IsNumber({}, { message: 'Area must be a number' })
  @Min(1, { message: 'Area must be greater than 0' })
  @Max(100000, { message: 'Area is too large' })
  @Transform(({ value }) => parseFloat(value))
  area: number;
}
