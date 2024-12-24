import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop({ enum: ['Male', 'Female', 'Other'], required: true })
  gender: string;

  @Prop()
  age: number;

  @Prop()
  country: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
