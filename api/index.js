
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export default async (req, res) => {
  const browserPath = join(
    process.cwd(),
    'dist/hng-ceylon-tours/browser'
  );

  console.log('Working directory:', process.cwd());
  console.log('Browser directory:', browserPath);

  console.log(
    'CSR file exists:',
    existsSync(join(browserPath, 'index.csr.html'))
  );

  if (existsSync(browserPath)) {
    console.log(
      'HTML files:',
      readdirSync(browserPath).filter(
        file => file.endsWith('.html')
      )
    );
  }

  const { reqHandler } = await import(
    '../dist/hng-ceylon-tours/server/server.mjs'
  );

  return reqHandler(req, res);
};
