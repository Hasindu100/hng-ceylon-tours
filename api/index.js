
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export default async (req, res) => {
  const apiDir = dirname(fileURLToPath(import.meta.url));

  const paths = [
    join(apiDir, '../dist/hng-ceylon-tours/browser'),
    join(process.cwd(), 'dist/hng-ceylon-tours/browser'),
    '/var/task/dist/hng-ceylon-tours/browser'
  ];

  for (const path of paths) {
    console.log('Checking:', path);
    console.log('Directory exists:', existsSync(path));
    console.log(
      'CSR exists:',
      existsSync(join(path, 'index.csr.html'))
    );

    if (existsSync(path)) {
      console.log('Files:', readdirSync(path).slice(0, 20));
    }
  }

  const { reqHandler } = await import(
    '../dist/hng-ceylon-tours/server/server.mjs'
  );

  return reqHandler(req, res);
};
