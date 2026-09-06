import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { store } from '../store';
import { requireAuth } from '../middleware/auth';
import { MCPServer } from '../types';

const router = Router();

const VALID_TRANSPORTS = ['stdio', 'http', 'sse'];
const REQUIRED_FIELDS = ['name', 'githubUrl', 'description', 'category', 'transport'];

function validateServer(body: Partial<MCPServer>): string[] {
  const errors: string[] = [];
  for (const field of REQUIRED_FIELDS) {
    if (!body[field as keyof MCPServer]) {
      errors.push(`Missing required field: ${field}`);
    }
  }
  if (body.transport && !VALID_TRANSPORTS.includes(body.transport)) {
    errors.push(`Invalid transport. Must be one of: ${VALID_TRANSPORTS.join(', ')}`);
  }
  if (body.githubUrl && !body.githubUrl.startsWith('https://github.com/')) {
    errors.push('githubUrl must be a valid GitHub URL (https://github.com/...)');
  }
  return errors;
}

// GET /servers — list all (public, paginated)
router.get('/', (req: Request, res: Response): void => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
  const offset = (page - 1) * limit;

  const all = store.getServers();
  const total = all.length;
  const totalPages = Math.ceil(total / limit);
  const data = all.slice(offset, offset + limit);

  res.json({
    data,
    total,
    page,
    totalPages,
    limit
  });
});

// GET /servers/:id — get single server (public)
router.get('/:id', (req: Request, res: Response): void => {
  const server = store.getServerById(req.params.id);
  if (!server) {
    res.status(404).json({ error: 'Server not found.', code: 'NOT_FOUND' });
    return;
  }
  res.json({ data: server });
});

// POST /servers — register new server (requires write)
router.post('/', requireAuth(['write']), (req: Request, res: Response): void => {
  const body = req.body as Partial<MCPServer>;
  const errors = validateServer(body);
  if (errors.length > 0) {
    res.status(400).json({ error: errors.join('; '), code: 'VALIDATION_ERROR' });
    return;
  }

  // Parse owner/repo from githubUrl if not provided
  let owner = body.owner;
  let repo = body.repo;
  if (!owner || !repo) {
    const match = (body.githubUrl || '').match(/https:\/\/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) {
      owner = owner || match[1];
      repo = repo || match[2];
    }
  }

  const now = new Date().toISOString();
  const server: MCPServer = {
    id: uuidv4(),
    name: body.name!,
    description: body.description!,
    githubUrl: body.githubUrl!,
    owner: owner || '',
    repo: repo || '',
    version: body.version || '0.1.0',
    tags: body.tags || [],
    category: body.category!,
    transport: body.transport!,
    installCommand: body.installCommand || '',
    tools: body.tools || [],
    stars: body.stars || 0,
    verified: false,
    createdAt: now,
    updatedAt: now
  };

  store.addServer(server);
  res.status(201).json({ data: server });
});

// PUT /servers/:id — update server (requires write)
router.put('/:id', requireAuth(['write']), (req: Request, res: Response): void => {
  const existing = store.getServerById(req.params.id);
  if (!existing) {
    res.status(404).json({ error: 'Server not found.', code: 'NOT_FOUND' });
    return;
  }

  const body = req.body as Partial<MCPServer>;

  // Validate transport if provided
  if (body.transport && !VALID_TRANSPORTS.includes(body.transport)) {
    res.status(400).json({
      error: `Invalid transport. Must be one of: ${VALID_TRANSPORTS.join(', ')}`,
      code: 'VALIDATION_ERROR'
    });
    return;
  }

  if (body.githubUrl && !body.githubUrl.startsWith('https://github.com/')) {
    res.status(400).json({
      error: 'githubUrl must be a valid GitHub URL (https://github.com/...)',
      code: 'VALIDATION_ERROR'
    });
    return;
  }

  // Don't allow overriding id, createdAt, verified via PUT (use dedicated endpoint)
  const { id, createdAt, verified, ...allowedUpdates } = body;
  void id; void createdAt; void verified;

  const updated = store.updateServer(req.params.id, allowedUpdates);
  res.json({ data: updated });
});

// DELETE /servers/:id — delete (requires admin)
router.delete('/:id', requireAuth(['admin']), (req: Request, res: Response): void => {
  const existing = store.getServerById(req.params.id);
  if (!existing) {
    res.status(404).json({ error: 'Server not found.', code: 'NOT_FOUND' });
    return;
  }
  store.deleteServer(req.params.id);
  res.json({ data: { message: `Server '${existing.name}' deleted successfully.` } });
});

// POST /servers/:id/verify — mark as verified (requires admin)
router.post('/:id/verify', requireAuth(['admin']), (req: Request, res: Response): void => {
  const existing = store.getServerById(req.params.id);
  if (!existing) {
    res.status(404).json({ error: 'Server not found.', code: 'NOT_FOUND' });
    return;
  }
  const updated = store.updateServer(req.params.id, { verified: true });
  res.json({ data: updated });
});

export default router;
