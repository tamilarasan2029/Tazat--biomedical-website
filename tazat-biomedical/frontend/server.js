const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = (process.env.BACKEND_URL || 'http://127.0.0.1:5000').replace(/\/$/, '');

app.disable('x-powered-by');
app.set('trust proxy', 'loopback');
app.use(express.json({ limit: '20kb' }));

// The site is a single page (index.html) with JavaScript routing.
app.use(express.static(path.join(__dirname, 'public')));

// Forward all /api calls to the Python backend, passing the visitor's IP along.
app.all('/api/*', async (req, res) => {
  try {
    const upstream = await fetch(BACKEND_URL + req.originalUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Forwarded-For': req.ip,
      },
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body || {}),
    });
    const type = upstream.headers.get('content-type') || 'application/json';
    res.status(upstream.status).type(type).send(await upstream.text());
  } catch (err) {
    console.error('Backend request failed:', err.message);
    res.status(502).json({ error: 'The service is temporarily unavailable. Please try again shortly.' });
  }
});

// Malformed JSON from the browser.
app.use((err, req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(400).json({ error: 'Send the form as JSON.' });
  }
  res.status(500).type('text').send('Something went wrong.');
});

app.use((req, res) => {
  res.status(404).type('text').send('Page not found');
});

// Open the site in the default browser (set NO_OPEN=1 to turn this off).
function openBrowser(url) {
  const { exec } = require('child_process');
  const command = process.platform === 'win32' ? `start "" "${url}"`
    : process.platform === 'darwin' ? `open "${url}"`
    : `xdg-open "${url}"`;
  exec(command, (err) => {
    if (err) console.log(`Open ${url} in your browser.`);
  });
}

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`TAZAT Biomedical site: ${url}`);
  console.log(`Backend: ${BACKEND_URL}`);
  if (!process.env.NO_OPEN) openBrowser(url);
});
