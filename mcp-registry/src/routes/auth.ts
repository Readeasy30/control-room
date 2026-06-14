import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';
import { store } from '../store';
import { requireAuth } from '../middleware/auth';
import { ApiKey } from '../types';

const router = Router();

function generateKey(): string {
  return 'mcp_' + randomBytes(16).toString('hex');
}

function validatePermissions(perms: unknown): ('read' | 'write' | 'admin')[] | null {
  const valid = ['read', 'write', 'admin'];
  if (!Array.isArray(perms)) return null;
  if (perms.length === 0) return null;
  if (!perms.every((p: unknown) => typeof p === 'string' && valid.includes(p))) return null;
  return perms as ('read' | 'write' | 'admin')[];
}

// POST /auth/keys — generate a new API key
// Requires either admin API key OR bootstrap token header
router.post('/keys', (req: Request, res: Response): void => {
  const bootstrapToken = process.env.BOOTSTRAP_TOKEN;
  const providedBootstrap = req.headers['x-bootstrap-token'] as string | undefined;

  const isBootstrap = bootstrapToken && providedBootstrap && providedBootstrap === bootstrapToken;

  if (!isBootstrap) {
    // Try admin auth
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
        error: 'Authentication required. Provide an admin API key or x-bootstrap-token header.',
        code: 'MISSING_AUTH'
      });
      return;
    }

    const foundKey = store.getApiKeys().find(k => k.key === rawKey);
    if (!foundKey) {
      res.status(401).json({ error: 'Invalid API key.', code: 'INVALID_API_KEY' });
      return;
    }
    if (!foundKey.permissions.includes('admin')) {
      res.status(403).json({
        error: 'Insufficient permissions. Admin permission required to create API keys.',
        code: 'INSUFFICIENT_PERMISSIONS'
      });
      return;
    }
  }

  const { name, owner, permissions } = req.body as {
    name?: string;
    owner?: string;
    permissions?: unknown;
  };

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    res.status(400).json({ error: 'Missing or invalid field: name', code: 'VALIDATION_ERROR' });
    return;
  }
  if (!owner || typeof owner !== 'string' || owner.trim().length === 0) {
    res.status(400).json({ error: 'Missing or invalid field: owner', code: 'VALIDATION_ERROR' });
    return;
  }

  const validatedPerms = validatePermissions(permissions);
  if (!validatedPerms) {
    res.status(400).json({
      error: 'Missing or invalid field: permissions. Must be a non-empty array of: read, write, admin',
      code: 'VALIDATION_ERROR'
    });
    return;
  }

  const now = new Date().toISOString();
  const apiKey: ApiKey = {
    id: uuidv4(),
    key: generateKey(),
    name: name.trim(),
    owner: owner.trim(),
    permissions: validatedPerms,
    createdAt: now
  };

  store.addApiKey(apiKey);

  res.status(201).json({ data: apiKey });
});

// GET /auth/keys — list all API keys (admin only)
router.get('/keys', requireAuth(['admin']), (req: Request, res: Response): void => {
  const keys = store.getApiKeys();
  res.json({
    data: keys,
    total: keys.length
  });
});

// DELETE /auth/keys/:id — revoke a key (admin only)
router.delete('/keys/:id', requireAuth(['admin']), (req: Request, res: Response): void => {
  const existing = store.getApiKeyById(req.params.id);
  if (!existing) {
    res.status(404).json({ error: 'API key not found.', code: 'NOT_FOUND' });
    return;
  }
  store.deleteApiKey(req.params.id);
  res.json({ data: { message: `API key '${existing.name}' revoked successfully.` } });
});

export default router;
