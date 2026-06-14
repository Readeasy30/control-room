import { MCPServer, ApiKey, Registry } from './types';
import registryData from './data/registry.json';

class RegistryStore {
  private servers: MCPServer[];
  private apiKeys: ApiKey[];
  private version: string;
  private lastUpdated: string;

  constructor() {
    const data = registryData as Registry;
    this.servers = data.servers;
    this.apiKeys = data.apiKeys;
    this.version = data.version;
    this.lastUpdated = data.lastUpdated;
  }

  // Server methods
  getServers(): MCPServer[] {
    return this.servers;
  }

  getServerById(id: string): MCPServer | undefined {
    return this.servers.find(s => s.id === id);
  }

  addServer(server: MCPServer): MCPServer {
    this.servers.push(server);
    this.lastUpdated = new Date().toISOString();
    return server;
  }

  updateServer(id: string, updates: Partial<MCPServer>): MCPServer | undefined {
    const idx = this.servers.findIndex(s => s.id === id);
    if (idx === -1) return undefined;
    this.servers[idx] = { ...this.servers[idx], ...updates, updatedAt: new Date().toISOString() };
    this.lastUpdated = new Date().toISOString();
    return this.servers[idx];
  }

  deleteServer(id: string): boolean {
    const idx = this.servers.findIndex(s => s.id === id);
    if (idx === -1) return false;
    this.servers.splice(idx, 1);
    this.lastUpdated = new Date().toISOString();
    return true;
  }

  // ApiKey methods
  getApiKeys(): ApiKey[] {
    return this.apiKeys;
  }

  getApiKeyById(id: string): ApiKey | undefined {
    return this.apiKeys.find(k => k.id === id);
  }

  addApiKey(key: ApiKey): ApiKey {
    this.apiKeys.push(key);
    return key;
  }

  deleteApiKey(id: string): boolean {
    const idx = this.apiKeys.findIndex(k => k.id === id);
    if (idx === -1) return false;
    this.apiKeys.splice(idx, 1);
    return true;
  }

  getVersion(): string {
    return this.version;
  }

  getLastUpdated(): string {
    return this.lastUpdated;
  }
}

export const store = new RegistryStore();
