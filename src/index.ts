/**
 * Main Application Entry Point
 * 
 * This file serves as the main entry point for the multi-tenant e-commerce API.
 * It initializes the Express application, sets up middleware, and starts the server.
 * 
 * Key responsibilities:
 * - Express app initialization
 * - Security middleware setup (helmet, cors, rate limiting)
 * - Database connection
 * - Server startup
 * 
 * The application uses a multi-tenant architecture where each tenant (storefront)
 * has its own isolated database instance while sharing the same application logic.
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { config } from './config/config.js';
import { connectToDatabase } from './config/database.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Connect to database and start server
connectToDatabase().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});