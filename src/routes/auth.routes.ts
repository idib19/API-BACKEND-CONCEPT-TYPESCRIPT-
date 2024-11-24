/**
 * Authentication Routes
 * 
 * Defines API endpoints for user authentication:
 * - User registration
 * - User login
 * - Token validation
 * - Password reset (to be implemented)
 */

import { Router } from 'express';
import { AuthService } from '../services/auth.service.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();
const authService = new AuthService();

router.post('/register', validateRequest(registerSchema), async (req, res) => {
  // Handle user registration
});

router.post('/login', validateRequest(loginSchema), async (req, res) => {
  // Handle user login
});

export default router;