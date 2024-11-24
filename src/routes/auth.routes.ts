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
  try {
    const { email, password, role, tenantId } = req.body;
    const token = await authService.registerUser(email, password, role, tenantId);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/login', validateRequest(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
});

export default router;