import { Request, Response, NextFunction } from 'express';
import { store } from '../store';

export function requireAuth(permissions: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const apiKeyHeader = req.headers['x-api-key'] as string | undefined;

    let rawKey: string | undefined;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      rawKey = authHeader.slice(7).trim();
    } else if (apiKeyHeader) {
      rawKey = apiKeyHeader.trim();
    }

    if (!rawKey) {
      res.status(401).json({
        error: 'Authentication required. Provide an API key via Authorization: Bearer <key> or x-api-key header.',
        code: 'MISSING_AUTH'
      });
      return;
    }

    const apiKey = store.getApiKeys().find(k => k.key === rawKey);

    if (!apiKey) {
      res.status(401).json({
        error: 'Invalid API key.',
        code: 'INVALID_API_KEY'
      });
      return;
    }

    const hasPermission = permissions.every(p => apiKey.permissions.includes(p as 'read' | 'write' | 'admin'));

    if (!hasPermission) {
      res.status(403).json({
        error: `Insufficient permissions. Required: ${permissions.join(', ')}. Your key has: ${apiKey.permissions.join(', ')}.`,
        code: 'INSUFFICIENT_PERMISSIONS'
      });
      return;
    }

    // Attach key info to request for downstream use
    (req as Request & { apiKey: typeof apiKey }).apiKey = apiKey;
    next();
  };
}
