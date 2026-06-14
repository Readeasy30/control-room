import { Router, Request, Response } from 'express';
import { store } from '../store';
import { MCPServer, SearchQuery } from '../types';

const router = Router();

function tokenize(text: string): string {
  return text.toLowerCase();
}

function matchesQuery(server: MCPServer, q: string): boolean {
  const needle = q.toLowerCase();
  const haystack = [
    server.name,
    server.description,
    server.owner,
    server.repo,
    server.category,
    ...server.tools,
    ...server.tags
  ].map(tokenize).join(' ');
  // Support multi-word queries: all terms must appear
  return needle.split(/\s+/).every(term => haystack.includes(term));
}

// GET /search
router.get('/', (req: Request, res: Response): void => {
  const query = req.query as SearchQuery;

  const page = Math.max(1, parseInt(query.page || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || '20')));

  let results = store.getServers();

  // Full-text search
  if (query.q && query.q.trim()) {
    results = results.filter(s => matchesQuery(s, query.q!.trim()));
  }

  // Category filter
  if (query.category) {
    const cat = query.category.toLowerCase();
    results = results.filter(s => s.category.toLowerCase() === cat);
  }

  // Tags filter (comma-separated, server must have ALL specified tags)
  if (query.tags) {
    const filterTags = query.tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
    if (filterTags.length > 0) {
      results = results.filter(s =>
        filterTags.every(tag => s.tags.map(t => t.toLowerCase()).includes(tag))
      );
    }
  }

  // Transport filter
  if (query.transport) {
    const transport = query.transport.toLowerCase();
    results = results.filter(s => s.transport.toLowerCase() === transport);
  }

  // Verified filter
  if (query.verified !== undefined) {
    const verifiedBool = query.verified === 'true';
    results = results.filter(s => s.verified === verifiedBool);
  }

  const total = results.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const paged = results.slice(offset, offset + limit);

  res.json({
    results: paged,
    total,
    page,
    totalPages,
    limit,
    query: {
      q: query.q || null,
      category: query.category || null,
      tags: query.tags ? query.tags.split(',').map(t => t.trim()).filter(Boolean) : null,
      transport: query.transport || null,
      verified: query.verified !== undefined ? query.verified === 'true' : null
    }
  });
});

export default router;
