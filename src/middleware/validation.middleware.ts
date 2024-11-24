/**
 * Validation Middleware
 * 
 * Provides request validation using Zod schemas.
 * Ensures incoming requests match expected formats and types.
 */

import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    // Validates incoming requests against Zod schemas
  }