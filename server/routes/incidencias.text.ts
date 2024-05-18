export default defineEventHandler((event) => {
  const config = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'asss': 'asdasd'
  }

  event.node.res.setHeader('Content-Type', 'text/plain');
  return JSON.stringify(config);
});
