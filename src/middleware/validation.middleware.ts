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
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  };