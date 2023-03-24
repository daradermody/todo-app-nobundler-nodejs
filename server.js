const http = require('http');
const fs = require('fs');

const host = 'localhost';
const port = 8000;

async function requestListener(req, res) {
  console.log(req.url)
  const filepath = 'public' + (req.url !== '/' ? decodeURIComponent(req.url) : '/index.html');

  try {
    const content = await fs.readFileSync(filepath);
    res.setHeader("Content-Type", getContentType(filepath));
    res.writeHead(200);
    res.end(content);

  } catch {
    res.writeHead(404);
    res.end('404 Not Found');
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

function getContentType(file) {
  const mime = {
    html: 'text/html',
    js: 'text/javascript',
  }[getExtension(file)];

  return mime ? `${mime}; charset=utf-8` : '';
}

function getExtension(file) {
  return file.split('.')[1];
}
