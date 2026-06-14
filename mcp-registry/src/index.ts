import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { store } from './store';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║          MCP Registry Server               ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log(`  Environment : ${NODE_ENV}`);
  console.log(`  Listening   : http://localhost:${PORT}`);
  console.log(`  Health      : http://localhost:${PORT}/health`);
  console.log(`  API Base    : http://localhost:${PORT}/api/v1`);
  console.log(`  Servers     : ${store.getServers().length} loaded from registry.json`);
  console.log(`  Registry v  : ${store.getVersion()}`);
  if (!process.env.BOOTSTRAP_TOKEN || process.env.BOOTSTRAP_TOKEN === 'change-me-to-something-secret') {
    console.warn('  [WARN] BOOTSTRAP_TOKEN is not set or is default. Please set a secure token in .env');
  }
  console.log('─────────────────────────────────────────────');
});
