const SEED_SERVERS = [
  {"id":"1","name":"GitHub MCP Server","description":"Interact with GitHub repositories, issues, PRs, and code search","githubUrl":"https://github.com/anthropics/github-mcp-server","owner":"anthropics","repo":"github-mcp-server","version":"1.0.0","tags":["github","git","vcs"],"category":"developer-tools","transport":"stdio","installCommand":"npx @anthropic-ai/mcp-github","tools":["create_issue","list_prs","search_code","get_file_contents","create_branch"],"stars":4200,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"2","name":"Filesystem MCP Server","description":"Read and write local files and directories","githubUrl":"https://github.com/modelcontextprotocol/servers","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["filesystem","files","io"],"category":"utilities","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-filesystem","tools":["read_file","write_file","list_directory","create_directory","move_file"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"3","name":"PostgreSQL MCP Server","description":"Query and manage PostgreSQL databases","githubUrl":"https://github.com/modelcontextprotocol/servers","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["postgresql","database","sql"],"category":"database","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-postgres","tools":["query","list_tables","describe_table","insert_row","update_row"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"4","name":"Brave Search MCP Server","description":"Web and local search using Brave Search API","githubUrl":"https://github.com/modelcontextprotocol/servers","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["search","web","brave"],"category":"search","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-brave-search","tools":["brave_web_search","brave_local_search"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"5","name":"Puppeteer MCP Server","description":"Browser automation and web scraping","githubUrl":"https://github.com/modelcontextprotocol/servers","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["browser","puppeteer","scraping","automation"],"category":"browser","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-puppeteer","tools":["puppeteer_navigate","puppeteer_screenshot","puppeteer_click","puppeteer_fill","puppeteer_evaluate"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"6","name":"Slack MCP Server","description":"Send messages and interact with Slack workspaces","githubUrl":"https://github.com/modelcontextprotocol/servers","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["slack","messaging","communication"],"category":"communication","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-slack","tools":["slack_post_message","slack_list_channels","slack_get_channel_history","slack_reply_to_thread"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"7","name":"SQLite MCP Server","description":"Interact with SQLite databases","githubUrl":"https://github.com/modelcontextprotocol/servers","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["sqlite","database","sql"],"category":"database","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-sqlite","tools":["read_query","write_query","list_tables","describe_table","create_table"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"8","name":"Fetch MCP Server","description":"Make HTTP requests and fetch web content","githubUrl":"https://github.com/modelcontextprotocol/servers","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["http","fetch","web","api"],"category":"utilities","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-fetch","tools":["fetch","fetch_html","fetch_markdown","fetch_txt"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"9","name":"Google Maps MCP Server","description":"Geocoding, directions, and places search via Google Maps","githubUrl":"https://github.com/modelcontextprotocol/servers","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["maps","geocoding","google","places"],"category":"location","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-google-maps","tools":["maps_geocode","maps_reverse_geocode","maps_search_places","maps_get_directions","maps_distance_matrix"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"10","name":"AWS KB Retrieval MCP Server","description":"Retrieve knowledge from AWS Bedrock Knowledge Bases","githubUrl":"https://github.com/modelcontextprotocol/servers","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["aws","bedrock","rag","knowledge-base"],"category":"ai","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-aws-kb-retrieval","tools":["retrieve_from_knowledge_base"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"}
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-api-key, x-bootstrap-token',
};

const BOOTSTRAP_TOKEN = 'mcp-registry-bootstrap-2024';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

function err(message, code, status = 400) {
  return json({ error: message, code }, status);
}

async function getServers(env) {
  const raw = await env.MCP_REGISTRY.get('servers');
  if (raw === null) {
    await env.MCP_REGISTRY.put('servers', JSON.stringify(SEED_SERVERS));
    return SEED_SERVERS;
  }
  return JSON.parse(raw);
}

async function putServers(env, servers) {
  await env.MCP_REGISTRY.put('servers', JSON.stringify(servers));
}

async function getKeys(env) {
  const raw = await env.MCP_REGISTRY.get('api_keys');
  if (raw === null) return [];
  return JSON.parse(raw);
}

async function putKeys(env, keys) {
  await env.MCP_REGISTRY.put('api_keys', JSON.stringify(keys));
}

function generateKey() {
  return 'mcp_' + Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

async function requireAuth(request, env, permission) {
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) return { error: err('Missing x-api-key header', 'MISSING_KEY', 401) };
  const keys = await getKeys(env);
  const keyObj = keys.find(k => k.key === apiKey);
  if (!keyObj) return { error: err('Invalid API key', 'INVALID_KEY', 401) };
  if (!keyObj.permissions.includes(permission)) {
    return { error: err('Insufficient permissions', 'FORBIDDEN', 403) };
  }
  return { keyObj };
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // GET /
    if (method === 'GET' && path === '/') {
      const servers = await getServers(env);
      return json({
        name: 'MCP Registry API',
        version: '1.0.0',
        total_servers: servers.length,
        endpoints: [
          'GET /',
          'GET /health',
          'GET /api/v1/servers',
          'GET /api/v1/servers/:id',
          'POST /api/v1/servers',
          'PUT /api/v1/servers/:id',
          'DELETE /api/v1/servers/:id',
          'POST /api/v1/servers/:id/verify',
          'GET /api/v1/search',
          'POST /api/v1/auth/keys',
          'GET /api/v1/auth/keys',
          'DELETE /api/v1/auth/keys/:id',
        ],
      });
    }

    // GET /health
    if (method === 'GET' && path === '/health') {
      const servers = await getServers(env);
      return json({ status: 'ok', servers: servers.length, version: '1.0.0' });
    }

    // GET /api/v1/servers
    if (method === 'GET' && path === '/api/v1/servers') {
      const servers = await getServers(env);
      const page = parseInt(url.searchParams.get('page') || '1', 10);
      const limit = parseInt(url.searchParams.get('limit') || '20', 10);
      const start = (page - 1) * limit;
      const slice = servers.slice(start, start + limit);
      return json({ data: slice, total: servers.length, page, totalPages: Math.ceil(servers.length / limit) });
    }

    // GET /api/v1/search
    if (method === 'GET' && path === '/api/v1/search') {
      let servers = await getServers(env);
      const q = url.searchParams.get('q');
      const category = url.searchParams.get('category');
      const tags = url.searchParams.get('tags');
      const transport = url.searchParams.get('transport');
      const verified = url.searchParams.get('verified');
      if (q) {
        const ql = q.toLowerCase();
        servers = servers.filter(s =>
          s.name.toLowerCase().includes(ql) ||
          s.description.toLowerCase().includes(ql) ||
          (s.tags && s.tags.some(t => t.toLowerCase().includes(ql)))
        );
      }
      if (category) servers = servers.filter(s => s.category === category);
      if (tags) {
        const tagList = tags.split(',').map(t => t.trim().toLowerCase());
        servers = servers.filter(s => s.tags && tagList.some(t => s.tags.includes(t)));
      }
      if (transport) servers = servers.filter(s => s.transport === transport);
      if (verified !== null && verified !== undefined && verified !== '') {
        const v = verified === 'true';
        servers = servers.filter(s => s.verified === v);
      }
      const page = parseInt(url.searchParams.get('page') || '1', 10);
      const limit = parseInt(url.searchParams.get('limit') || '20', 10);
      const start = (page - 1) * limit;
      const slice = servers.slice(start, start + limit);
      return json({ data: slice, total: servers.length, page, totalPages: Math.ceil(servers.length / limit) });
    }

    // GET /api/v1/servers/:id
    const serverIdMatch = path.match(/^\/api\/v1\/servers\/([^\/]+)$/);
    if (method === 'GET' && serverIdMatch) {
      const id = serverIdMatch[1];
      const servers = await getServers(env);
      const server = servers.find(s => s.id === id);
      if (!server) return err('Server not found', 'NOT_FOUND', 404);
      return json({ data: server });
    }

    // POST /api/v1/servers
    if (method === 'POST' && path === '/api/v1/servers') {
      const auth = await requireAuth(request, env, 'write');
      if (auth.error) return auth.error;
      let body;
      try { body = await request.json(); } catch { return err('Invalid JSON', 'BAD_REQUEST'); }
      const servers = await getServers(env);
      const newServer = {
        ...body,
        id: crypto.randomUUID(),
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      servers.push(newServer);
      await putServers(env, servers);
      return json({ data: newServer }, 201);
    }

    // PUT /api/v1/servers/:id
    if (method === 'PUT' && serverIdMatch) {
      const auth = await requireAuth(request, env, 'write');
      if (auth.error) return auth.error;
      const id = serverIdMatch[1];
      let body;
      try { body = await request.json(); } catch { return err('Invalid JSON', 'BAD_REQUEST'); }
      const servers = await getServers(env);
      const idx = servers.findIndex(s => s.id === id);
      if (idx === -1) return err('Server not found', 'NOT_FOUND', 404);
      servers[idx] = { ...servers[idx], ...body, id, updatedAt: new Date().toISOString() };
      await putServers(env, servers);
      return json({ data: servers[idx] });
    }

    // DELETE /api/v1/servers/:id
    if (method === 'DELETE' && serverIdMatch) {
      const auth = await requireAuth(request, env, 'admin');
      if (auth.error) return auth.error;
      const id = serverIdMatch[1];
      const servers = await getServers(env);
      const idx = servers.findIndex(s => s.id === id);
      if (idx === -1) return err('Server not found', 'NOT_FOUND', 404);
      servers.splice(idx, 1);
      await putServers(env, servers);
      return json({ data: { deleted: true, id } });
    }

    // POST /api/v1/servers/:id/verify
    const verifyMatch = path.match(/^\/api\/v1\/servers\/([^\/]+)\/verify$/);
    if (method === 'POST' && verifyMatch) {
      const auth = await requireAuth(request, env, 'admin');
      if (auth.error) return auth.error;
      const id = verifyMatch[1];
      const servers = await getServers(env);
      const idx = servers.findIndex(s => s.id === id);
      if (idx === -1) return err('Server not found', 'NOT_FOUND', 404);
      servers[idx].verified = true;
      servers[idx].updatedAt = new Date().toISOString();
      await putServers(env, servers);
      return json({ data: servers[idx] });
    }

    // POST /api/v1/auth/keys
    if (method === 'POST' && path === '/api/v1/auth/keys') {
      let body;
      try { body = await request.json(); } catch { body = {}; }
      const keys = await getKeys(env);
      const bootstrapToken = request.headers.get('x-bootstrap-token');
      const apiKey = request.headers.get('x-api-key');
      let isAdmin = false;

      if (bootstrapToken === BOOTSTRAP_TOKEN && keys.length === 0) {
        isAdmin = true;
      } else if (apiKey) {
        const keyObj = keys.find(k => k.key === apiKey);
        if (keyObj && keyObj.permissions.includes('admin')) isAdmin = true;
      }

      if (!isAdmin) return err('Unauthorized', 'UNAUTHORIZED', 401);

      const newKey = {
        id: crypto.randomUUID(),
        key: generateKey(),
        name: body.name || 'Unnamed Key',
        owner: body.owner || 'unknown',
        permissions: body.permissions || ['write'],
        createdAt: new Date().toISOString(),
      };
      keys.push(newKey);
      await putKeys(env, keys);
      return json({ data: newKey }, 201);
    }

    // GET /api/v1/auth/keys
    if (method === 'GET' && path === '/api/v1/auth/keys') {
      const auth = await requireAuth(request, env, 'admin');
      if (auth.error) return auth.error;
      const keys = await getKeys(env);
      const masked = keys.map(k => ({ ...k, key: '...' + k.key.slice(-4) }));
      return json({ data: masked, total: masked.length });
    }

    // DELETE /api/v1/auth/keys/:id
    const keyIdMatch = path.match(/^\/api\/v1\/auth\/keys\/([^\/]+)$/);
    if (method === 'DELETE' && keyIdMatch) {
      const auth = await requireAuth(request, env, 'admin');
      if (auth.error) return auth.error;
      const id = keyIdMatch[1];
      const keys = await getKeys(env);
      const idx = keys.findIndex(k => k.id === id);
      if (idx === -1) return err('Key not found', 'NOT_FOUND', 404);
      keys.splice(idx, 1);
      await putKeys(env, keys);
      return json({ data: { deleted: true, id } });
    }

    return err('Not found', 'NOT_FOUND', 404);
  },
};
