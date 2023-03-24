import { Generator } from '@jspm/generator';
import pkg from '../package.json' assert { type: 'json' };
import fs from 'fs';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const generator = new Generator({
  mapUrl: import.meta.url,
  env: ['production', 'browser', 'module'],
});

for (const [bareImport, version] of Object.entries(pkg.dependencies)) {
  await generator.install(`${bareImport}@${version}`);
}

const outHtml = await generator.htmlInject(`
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <title>To Do App</title>
    <script src="/appLoader.js"></script>
    <script>
      process = { env: { NODE_ENV: 'production' } } // needed because of MUI's chainPropTypes
    </script>
  </head>
  <body style="margin: 0">
    <div id="app">
      <div style="height: 100vh; display: flex; align-items: center">
        <h1 style="width: 100%; text-align: center">
          Fetching <span id="fetch-number">0</span> modules...
        </h1>
      </div>
    </div>
  </body>
</html>
`, {
  rootUrl: `/home/dara/git/todo-app-nobundler-node`,
  trace: false,
  comment: false,
  esModuleShims: false
});

fs.writeFileSync(`${__dirname}../public/index.html`, outHtml);
