import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../types';

export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    first_name: {
      type: String,
      required: true,
      trim: true
    },
    last_name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

// Índice composto para melhor performance
UserSchema.index({ id: 1, email: 1 });

export const User = mongoose.model<IUserDocument>('User', UserSchema);