
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export default async (req, res) => {
  const root = process.cwd();

  const browserPath = join(
    root,
    'dist/hng-ceylon-tours/browser'
  );

  console.log('Working directory:', root);
  console.log('Browser directory:', browserPath);

  console.log(
    'CSR file exists:',
    existsSync(join(browserPath, 'index.csr.html'))
  );

  if (existsSync(browserPath)) {
    console.log(
      'Browser files:',
      readdirSync(browserPath).slice(0, 20)
    );
  }

  const { reqHandler } = await import(
    '../dist/hng-ceylon-tours/server/server.mjs'
  );

  return reqHandler(req, res);
};
