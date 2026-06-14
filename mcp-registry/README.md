# MCP Registry

A REST API service that catalogs, manages, and serves MCP (Model Context Protocol) server listings. Think of it like npm registry but for MCP servers.

## Quick Start

```bash
cd mcp-registry
npm install
cp .env.example .env
# Edit .env and set a secure BOOTSTRAP_TOKEN
npm run dev
```

The server will start on `http://localhost:3000` by default.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port to listen on |
| `BOOTSTRAP_TOKEN` | *(required)* | Secret token used to create the first admin API key |
| `NODE_ENV` | `development` | Environment (`development` \| `production`) |

## Data Storage

All data is stored **in-memory** at startup, seeded from `src/data/registry.json`. Write operations (creating/updating/deleting servers and API keys) update the in-memory store only and **are not persisted to disk** — changes are lost on restart. To make changes permanent, edit `src/data/registry.json` directly.

## Authentication

API keys are passed via:
- `Authorization: Bearer <key>` header, or  
- `x-api-key: <key>` header

Permission levels:
- `read` — list and view servers
- `write` — register and update servers
- `admin` — full access including key management, deletion, and verification

To create your first admin key, use the bootstrap token:

```bash
curl -X POST http://localhost:3000/api/v1/auth/keys \
  -H "Content-Type: application/json" \
  -H "x-bootstrap-token: your-bootstrap-token" \
  -d '{"name": "admin-key", "owner": "your-name", "permissions": ["read", "write", "admin"]}'
```

Save the returned `key` value — it won't be shown again (but can be retrieved via `GET /api/v1/auth/keys` with an admin key).

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/` | None | API info and endpoint listing |
| `GET` | `/health` | None | Health check |
| `GET` | `/api/v1/servers` | None | List all servers (paginated) |
| `GET` | `/api/v1/servers/:id` | None | Get a single server by ID |
| `POST` | `/api/v1/servers` | `write` | Register a new MCP server |
| `PUT` | `/api/v1/servers/:id` | `write` | Update a server |
| `DELETE` | `/api/v1/servers/:id` | `admin` | Delete a server |
| `POST` | `/api/v1/servers/:id/verify` | `admin` | Mark a server as verified |
| `GET` | `/api/v1/search` | None | Search and filter servers |
| `POST` | `/api/v1/auth/keys` | `admin` or bootstrap | Generate an API key |
| `GET` | `/api/v1/auth/keys` | `admin` | List all API keys |
| `DELETE` | `/api/v1/auth/keys/:id` | `admin` | Revoke an API key |

### Query Parameters for `GET /api/v1/servers`

| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20, max: 100) |

### Query Parameters for `GET /api/v1/search`

| Param | Type | Description |
|---|---|---|
| `q` | string | Full-text search on name, description, tools, tags, owner, repo |
| `category` | string | Filter by category (e.g., `database`, `productivity`, `search`, `browser`, `communication`) |
| `tags` | string | Comma-separated tags — server must have ALL specified tags |
| `transport` | string | Filter by transport: `stdio`, `http`, or `sse` |
| `verified` | boolean | Filter by verification status: `true` or `false` |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20, max: 100) |

## Example curl Commands

### List all servers

```bash
curl http://localhost:3000/api/v1/servers
```

### Get a single server

```bash
curl http://localhost:3000/api/v1/servers/01900000-0000-0000-0000-000000000001
```

### Search servers

```bash
# Full-text search
curl "http://localhost:3000/api/v1/search?q=database"

# Filter by category
curl "http://localhost:3000/api/v1/search?category=database"

# Filter by multiple tags
curl "http://localhost:3000/api/v1/search?tags=sql,database"

# Filter verified servers with transport stdio
curl "http://localhost:3000/api/v1/search?verified=true&transport=stdio"

# Combined search with pagination
curl "http://localhost:3000/api/v1/search?q=postgres&category=database&page=1&limit=10"
```

### Register a new server

```bash
curl -X POST http://localhost:3000/api/v1/servers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer mcp_your_write_key_here" \
  -d '{
    "name": "my-custom-mcp-server",
    "description": "A custom MCP server that does amazing things.",
    "githubUrl": "https://github.com/myorg/my-custom-mcp-server",
    "version": "1.0.0",
    "category": "productivity",
    "transport": "stdio",
    "installCommand": "npx my-custom-mcp-server",
    "tools": ["do_thing", "get_info"],
    "tags": ["custom", "productivity"]
  }'
```

### Generate an API key (using bootstrap token)

```bash
curl -X POST http://localhost:3000/api/v1/auth/keys \
  -H "Content-Type: application/json" \
  -H "x-bootstrap-token: your-bootstrap-token" \
  -d '{
    "name": "my-write-key",
    "owner": "your-username",
    "permissions": ["read", "write"]
  }'
```

### Generate an API key (using existing admin key)

```bash
curl -X POST http://localhost:3000/api/v1/auth/keys \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer mcp_your_admin_key_here" \
  -d '{
    "name": "ci-write-key",
    "owner": "ci-bot",
    "permissions": ["read", "write"]
  }'
```

### Revoke an API key

```bash
curl -X DELETE http://localhost:3000/api/v1/auth/keys/<key-id> \
  -H "Authorization: Bearer mcp_your_admin_key_here"
```

### Mark a server as verified

```bash
curl -X POST http://localhost:3000/api/v1/servers/<server-id>/verify \
  -H "Authorization: Bearer mcp_your_admin_key_here"
```

## Response Formats

### List response

```json
{
  "data": [...],
  "total": 10,
  "page": 1,
  "totalPages": 1,
  "limit": 20
}
```

### Single item response

```json
{
  "data": { ... }
}
```

### Error response

```json
{
  "error": "Human-readable error message.",
  "code": "ERROR_CODE"
}
```

## MCPServer Object

```json
{
  "id": "uuid",
  "name": "github-mcp-server",
  "description": "Official GitHub MCP server",
  "githubUrl": "https://github.com/anthropics/github-mcp-server",
  "owner": "anthropics",
  "repo": "github-mcp-server",
  "version": "0.1.0",
  "tags": ["github", "git"],
  "category": "productivity",
  "transport": "stdio",
  "installCommand": "npx @anthropic-ai/github-mcp-server",
  "tools": ["get_file_contents", "create_pull_request"],
  "stars": 4200,
  "verified": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```
