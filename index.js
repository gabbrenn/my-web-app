const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>Hello, World!</h1><p>Simple Web Server is running.</p>');
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
