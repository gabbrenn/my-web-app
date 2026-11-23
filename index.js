const http = require('http');
const querystring = require('querystring');

const PORT = process.env.PORT || 3000;

const loginPageHtml = (message = '') => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - My Web App</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: #f0f2f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
    .card { background: #ffffff; padding: 32px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); width: 100%; max-width: 380px; }
    h2 { margin-bottom: 24px; color: #1a1a1a; text-align: center; }
    .form-group { margin-bottom: 16px; }
    label { display: block; margin-bottom: 6px; font-size: 14px; color: #4b5563; font-weight: 500; }
    input[type="text"], input[type="password"] { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; outline: none; transition: border-color 0.2s; }
    input[type="text"]:focus, input[type="password"]:focus { border-color: #2563eb; }
    button { width: 100%; padding: 10px; background: #2563eb; color: #ffffff; border: none; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.2s; margin-top: 8px; }
    button:hover { background: #1d4ed8; }
    .message { margin-bottom: 16px; padding: 10px; border-radius: 6px; font-size: 14px; text-align: center; }
    .error { background: #fee2e2; color: #991b1b; }
    .success { background: #dcfce7; color: #166534; }
    .links { margin-top: 16px; text-align: center; font-size: 13px; }
    .links a { color: #2563eb; text-decoration: none; }
    .links a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Sign In</h2>
    ${message}
    <form method="POST" action="/login">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Enter your username" required autofocus>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required>
      </div>
      <button type="submit">Log In</button>
    </form>
    <div class="links">
      <a href="/">Back to Home</a> | <a href="/about">About</a>
    </div>
  </div>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/about') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('About Page\n');
  } else if (req.url === '/login' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(loginPageHtml());
  } else if (req.url === '/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const parsed = querystring.parse(body);
      const username = parsed.username ? parsed.username.trim() : '';
      const password = parsed.password ? parsed.password.trim() : '';
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      if (username && password) {
        res.statusCode = 200;
        res.end(loginPageHtml(`<div class="message success">Welcome, <strong>${username}</strong>! Login successful.</div>`));
      } else {
        res.statusCode = 400;
        res.end(loginPageHtml('<div class="message error">Please provide both username and password.</div>'));
      }
    });
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>Home - My Web App</title></head>
      <body style="font-family: sans-serif; padding: 40px; text-align: center;">
        <h1>Hello, World!</h1>
        <p>Simple Web Server is running.</p>
        <p style="margin-top: 20px;">
          <a href="/login" style="display: inline-block; padding: 10px 20px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 500;">Go to Login Page</a>
          &nbsp;&nbsp;
          <a href="/about" style="color: #2563eb;">About Page</a>
        </p>
      </body>
      </html>
    `);
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
