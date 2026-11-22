
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export default async (req, res) => {
  const browserPath = join(
    process.cwd(),
    'dist/hng-ceylon-tours/browser'
  );

  console.log('Browser directory:', browserPath);

  if (existsSync(browserPath)) {
    const files = readdirSync(browserPath);

    console.log(
      'HTML files:',
      files.filter(file => file.endsWith('.html'))
    );

    console.log('Total files:', files.length);
  }

  const { reqHandler } = await import(
    '../dist/hng-ceylon-tours/server/server.mjs'
  );

  return reqHandler(req, res);
};
