import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

enum UserRole {
  admin = 'admin',
  user = 'user',
}

export type UserDocument = HydratedDocument<User>;

Schema();
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: UserRole.user, required: true })
  role: UserRole;

  @Prop({ default: Date.now(), required: true })
  lastLogin: Date;

  @Prop({ default: Date.now(), required: true })
  createdAt: Date;

  @Prop({ default: false, required: true })
  isActive: boolean;

  @Prop()
  confirmationCode: string;

  @Prop()
  expirationDate: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
