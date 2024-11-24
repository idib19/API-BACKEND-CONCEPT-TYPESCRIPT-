/**
 * Database Connection Management Module
 * 
 * This module handles all database connections for the multi-tenant architecture.
 * It provides functionality for both the main application database connection
 * and individual tenant database connections.
 * 
 * Key features:
 * - Main database connection initialization
 * - Tenant-specific database connection management
 * - Connection error handling
 * - Database connection pooling
 * 
 * The multi-tenant architecture uses a database-per-tenant model where:
 * - Each tenant has their own isolated database
 * - Tenant databases are dynamically created and connected
 * - Database names are prefixed with 'tenant-' followed by the tenant ID
 */

import mongoose from 'mongoose';
import { config } from './config.js';

export async function connectToDatabase() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export async function getTenantConnection(tenantId: string) {
  const dbName = `tenant-${tenantId}`;
  return mongoose.createConnection(`${config.mongoUri}/${dbName}`);
}