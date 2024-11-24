/**
 * User Model
 * 
 * Defines the schema for user accounts in the system.
 * Supports both admin users and storefront owners.
 */

import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'admin' | 'owner';
  tenantId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'owner'], 
    required: true 
  },
  tenantId: { 
    type: String,
    required: function() { 
      return this.role === 'owner'; 
    }
  }
}, {
  timestamps: true
});

export const UserModel = mongoose.model<IUser>('User', userSchema);