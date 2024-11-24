/**
 * Application Configuration Module
 * 
 * This module handles all configuration management for the application using
 * environment variables with strong typing and validation through Zod.
 * 
 * Features:
 * - Environment variables loading via dotenv
 * - Schema validation for configuration values
 * - Type-safe configuration object
 * - Default values for development environment
 * 
 * The configuration schema enforces:
 * - Required MongoDB connection string
 * - Required JWT secret for authentication
 * - Port number (defaults to 3000)
 * - Environment type validation (development/production/test)
 */

import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  port: z.number().default(3000),
  mongoUri: z.string().min(1),
  jwtSecret: z.string().min(1),
  environment: z.enum(['development', 'production', 'test']).default('development'),
});

export const config = configSchema.parse({
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  environment: process.env.NODE_ENV,
});