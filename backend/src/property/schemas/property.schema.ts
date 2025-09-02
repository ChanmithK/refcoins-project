import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyDocument = Property & Document;

// Property Schema
@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true, trim: true, maxlength: 200 })
  title: string;

  @Prop({
    required: true,
    validate: {
      validator: (v: string) => /^https?:\/\/.+/.test(v),
      message: 'Image must be a valid URL',
    },
  })
  image: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (v: string) => /^[a-z0-9-]+$/.test(v),
      message: 'Slug must contain only lowercase letters, numbers, and hyphens',
    },
  })
  slug: string;

  @Prop({
    required: true,
    enum: ['Colombo', 'Kandy', 'Galle'],
  })
  location: string;

  @Prop({ required: true, maxlength: 2000 })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({
    required: true,
    enum: ['Single Family', 'Villa'],
  })
  type: string;

  @Prop({
    required: true,
    enum: ['For Sale', 'For Rent'],
  })
  status: string;

  @Prop({ required: true, min: 1 })
  area: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);

PropertySchema.index({ location: 1, status: 1, type: 1 });
PropertySchema.index({ createdAt: -1 });
