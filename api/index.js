export default async (req, res) => {
  const { reqHandler } = await import('../dist/hng-ceylon-tours/server/server.mjs');
  return reqHandler(req, res);
};