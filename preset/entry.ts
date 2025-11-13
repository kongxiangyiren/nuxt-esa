import '#nitro-internal-pollyfills';
import { useNitroApp } from 'nitropack/runtime';
const nitroApp = useNitroApp();
export default {
  fetch: async (request: Request) => {
    return await handleRequest(request);
  }
};

async function handleRequest(request: Request) {
  const url = new URL(request.url);
  let body;
  if (request.body) {
    body = await request.arrayBuffer();
  }
  return nitroApp.localFetch(url.pathname + url.search, {
    host: url.hostname,
    protocol: url.protocol,
    headers: request.headers,
    method: request.method,
    body
  });
}
