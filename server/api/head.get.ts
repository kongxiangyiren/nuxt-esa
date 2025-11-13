export default defineEventHandler(async event => {
  // ... 在这里做任何你想做的事情
  const headers = event.node.req.headers
  return headers;
});
