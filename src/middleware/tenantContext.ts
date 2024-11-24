import { Request, Response, NextFunction } from 'express';
import { getTenantConnection } from '../config/database.js';

declare global {
  namespace Express {
    interface Request {
      tenantId?: string;
      tenantDb?: any;
    }
  }
}

export async function tenantContext(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.headers['x-tenant-id'] as string;

  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant ID is required' });
  }

  try {
    const tenantDb = await getTenantConnection(tenantId);
    req.tenantId = tenantId;
    req.tenantDb = tenantDb;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to tenant database' });
  }
}