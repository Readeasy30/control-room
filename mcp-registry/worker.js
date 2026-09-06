// Cloudflare Serverless AI Core Routing Engine
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Route-Target',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // Direct automated configuration path endpoints
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/health') {
      return new Response(JSON.stringify({ status: "OMNIROUTE_EDGE_LIVE" }), {
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    if (request.method !== 'POST') {
      return new Response("OmniRoute Edge Pipeline Engine Active", { status: 200 });
    }

    const payload = await request.json();
    const targetModel = request.headers.get('X-Route-Target') || 'deepseek';

    try {
      if (targetModel === 'deepseek') {
        return await callModelEndpoint(payload, env.DEEPSEEK_NODE_URL, env.DEEPSEEK_API_KEY);
      } else if (targetModel === 'qwen') {
        // Leverages Cloudflare Workers AI system native catalog directly
        const aiResponse = await env.AI.run('@cf/qwen/qwen1.5-14b-chat', payload);
        return new Response(JSON.stringify(aiResponse), {
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        });
      } else {
        return await callModelEndpoint(payload, 'https://moonshot.cn', env.KIMI_API_KEY);
      }
    } catch (edgeError) {
      // Dynamic Automated Fallback Track
      console.error("Primary node connection dropped. Routing automatic fallback to Kimi Engine...");
      return await callModelEndpoint(payload, 'https://moonshot.cn', env.KIMI_API_KEY);
    }
  }
};

async function callModelEndpoint(payload, endpoint, token) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": Bearer \,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  
  const responseData = await response.json();
  return new Response(JSON.stringify(responseData), {
    status: response.status,
    headers: CORS_HEADERS
  });
}
