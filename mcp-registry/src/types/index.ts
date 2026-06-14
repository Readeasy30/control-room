export interface MCPServer {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  owner: string;
  repo: string;
  version: string;
  tags: string[];
  category: string;
  transport: 'stdio' | 'http' | 'sse';
  installCommand: string;
  tools: string[];
  stars: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiKey {
  id: string;
  key: string;
  name: string;
  owner: string;
  permissions: ('read' | 'write' | 'admin')[];
  createdAt: string;
}

export interface Registry {
  servers: MCPServer[];
  apiKeys: ApiKey[];
  version: string;
  lastUpdated: string;
}

export interface SearchQuery {
  q?: string;
  category?: string;
  tags?: string;
  transport?: string;
  verified?: string;
  page?: string;
  limit?: string;
}
