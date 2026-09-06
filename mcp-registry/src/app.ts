import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import serversRouter from './routes/servers';
import searchRouter from './routes/search';
import authRouter from './routes/auth';
import { store } from './store';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    servers: store.getServers().length,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Root — API info
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'MCP Registry API',
    version: '1.0.0',
    description: 'GitHub MCP Server Registry — discover and manage Model Context Protocol servers',
    totalServers: store.getServers().length,
    lastUpdated: store.getLastUpdated(),
    endpoints: {
      health: 'GET /health',
      servers: {
        list: 'GET /api/v1/servers',
        get: 'GET /api/v1/servers/:id',
        create: 'POST /api/v1/servers  [requires write]',
        update: 'PUT /api/v1/servers/:id  [requires write]',
        delete: 'DELETE /api/v1/servers/:id  [requires admin]',
        verify: 'POST /api/v1/servers/:id/verify  [requires admin]'
      },
      search: {
        search: 'GET /api/v1/search?q=&category=&tags=&transport=&verified='
      },
      auth: {
        createKey: 'POST /api/v1/auth/keys  [requires admin or bootstrap token]',
        listKeys: 'GET /api/v1/auth/keys  [requires admin]',
        revokeKey: 'DELETE /api/v1/auth/keys/:id  [requires admin]'
      }
    },
    docs: 'https://github.com/readeasy30/control-room/tree/main/mcp-registry#readme'
  });
});

// API routes
app.use('/api/v1/servers', serversRouter);
app.use('/api/v1/search', searchRouter);
app.use('/api/v1/auth', authRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Endpoint not found.',
    code: 'NOT_FOUND',
    hint: 'Visit GET / for a list of available endpoints.'
  });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[MCP Registry Error]', err);
  res.status(500).json({
    error: 'An internal server error occurred.',
    code: 'INTERNAL_ERROR',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;
