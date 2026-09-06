const SEED_SERVERS = [
  {"id":"1","name":"GitHub MCP Server","description":"Interact with GitHub repositories, issues, PRs, and code search","githubUrl":"https://github.com","owner":"anthropics","repo":"github-mcp-server","version":"1.0.0","tags":["github","git","vcs"],"category":"developer-tools","transport":"stdio","installCommand":"npx @anthropic-ai/mcp-github","tools":["create_issue","list_prs","search_code","get_file_contents","create_branch"],"stars":4200,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"2","name":"Filesystem MCP Server","description":"Read and write local files and directories","githubUrl":"https://github.com","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["filesystem","files","io"],"category":"utilities","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-filesystem","tools":["read_file","write_file","list_directory","create_directory","move_file"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"3","name":"PostgreSQL MCP Server","description":"Query and manage PostgreSQL databases","githubUrl":"https://github.com","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["postgresql","database","sql"],"category":"database","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-postgres","tools":["query","list_tables","describe_table","insert_row","update_row"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"4","name":"Brave Search MCP Server","description":"Web and local search using Brave Search API","githubUrl":"https://github.com","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["search","web","brave"],"category":"search","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-brave-search","tools":["brave_web_search","brave_local_search"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"5","name":"Puppeteer MCP Server","description":"Browser automation and web scraping","githubUrl":"https://github.com","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["browser","puppeteer","scraping","automation"],"category":"browser","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-puppeteer","tools":["puppeteer_navigate","puppeteer_screenshot","puppeteer_click","puppeteer_fill","puppeteer_evaluate"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"6","name":"Slack MCP Server","description":"Send messages and interact with Slack workspaces","githubUrl":"https://github.com","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["slack","messaging","communication"],"category":"communication","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-slack","tools":["slack_post_message","slack_list_channels","slack_get_channel_history","slack_reply_to_thread"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"7","name":"SQLite MCP Server","description":"Interact with SQLite databases","githubUrl":"https://github.com","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["sqlite","database","sql"],"category":"database","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-sqlite","tools":["read_query","write_query","list_tables","describe_table","create_table"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"8","name":"Fetch MCP Server","description":"Make HTTP requests and fetch web content","githubUrl":"https://github.com","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["http","fetch","web","api"],"category":"utilities","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-fetch","tools":["fetch","fetch_html","fetch_markdown","fetch_txt"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"9","name":"Google Maps MCP Server","description":"Geocoding, directions, and places search via Google Maps","githubUrl":"https://github.com","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["maps","geocoding","google","places"],"category":"location","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-google-maps","tools":["maps_geocode","maps_reverse_geocode","maps_search_places","maps_get_directions","maps_distance_matrix"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"},
  {"id":"10","name":"AWS KB Retrieval MCP Server","description":"Retrieve knowledge from AWS Bedrock Knowledge Bases","githubUrl":"https://github.com","owner":"modelcontextprotocol","repo":"servers","version":"0.6.2","tags":["aws","bedrock","rag","knowledge-base"],"category":"ai","transport":"stdio","installCommand":"npx @modelcontextprotocol/server-aws-kb-retrieval","tools":["retrieve_from_knowledge_base"],"stars":8900,"verified":true,"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"}
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-api-key, x-bootstrap-token',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
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

async function requireAuth(request, env, requiredRole = 'user') {
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) return { error: err('Missing API Key', 'UNAUTHORIZED', 401) };
  const keys = await getKeys(env);
  const matched = keys.find(k => k.key === apiKey);
  if (!matched) return { error: err('Invalid API Key', 'FORBIDDEN', 403) };
  if (requiredRole === 'admin' && matched.role !== 'admin') {
    return { error: err('Admin role required', 'FORBIDDEN', 403) };
  }
  return { key: matched };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const method = request.method;
    const path = url.pathname;

    if (method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (method === 'GET' && path === '/') {
      return json({
        status: 'online',
        service: 'mcp-registry',
        endpoints: [
          'GET /health',
          'GET /api/v1/servers',
          'GET /api/v1/search',
        ],
      });
    }

    if (method === 'GET' && path === '/health') {
      return json({ status: 'OK' });
    }

    if (method === 'GET' && path === '/api/v1/servers') {
      const servers = await getServers(env);
      return json({ data: servers });
    }

    if (method === 'GET' && path === '/api/v1/search') {
      const q = (url.searchParams.get('q') || '').toLowerCase();
      const servers = await getServers(env);
      const filtered = servers.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      );
      return json({ data: filtered });
    }

    return err('Not found', 'NOT_FOUND', 404);
  }
};
