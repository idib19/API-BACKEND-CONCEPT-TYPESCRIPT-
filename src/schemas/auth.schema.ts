/**
 * Authentication Schemas
 * 
 * Defines Zod validation schemas for authentication-related requests:
 * - User registration
 * - User login
 * - Password reset
 */

import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['admin', 'owner']),
    tenantId: z.string().optional()
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string()
  })
});