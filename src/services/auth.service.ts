/**
 * Authentication Service
 * 
 * Handles user authentication, token generation, and password management.
 * Provides methods for user registration, login, and token validation.
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { UserModel, IUser } from '../models/User.js';

export class AuthService {
  async registerUser(email: string, password: string, role: 'admin' | 'owner', tenantId?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new UserModel({
      email,
      password: hashedPassword,
      role,
      ...(role === 'owner' && { tenantId })
    });

    await user.save();
    return this.generateToken(user);
  }

  async loginUser(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    return this.generateToken(user);
  }

  private generateToken(user: IUser) {
    return jwt.sign(
      { 
        userId: user._id, 
        role: user.role,
        tenantId: user.tenantId 
      },
      config.jwtSecret,
      { expiresIn: '24h' }
    );
  }

  verifyToken(token: string) {
    return jwt.verify(token, config.jwtSecret);
  }
}