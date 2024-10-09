import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as idv4 } from 'uuid';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, default: idv4 })
  _id: string;
  @Prop({ type: String, required: true })
  firstName: string;
  @Prop({ type: String, required: true })
  lastName: string;
  @Prop({ type: String, unique: true, required: true })
  email: string;
  @Prop({ type: String })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
