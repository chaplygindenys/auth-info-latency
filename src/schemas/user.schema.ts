import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  id_type: string;

  @Prop({ required: true })
  hashPsw: string;

  @Prop()
  hashRefreshToken: string;

  @Prop({ required: true })
  version: number;

  @Prop({ required: true })
  createdAt: number;

  @Prop({ required: true })
  updatedAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
