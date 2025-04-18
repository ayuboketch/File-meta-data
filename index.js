// index.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const multer  = require('multer');
const path    = require('path');

const app = express();

// ─── Serve the homepage & static assets ─────────────────────────────────────────
// Place public/index.html and other assets in ./public :contentReference[oaicite:3]{index=3}
app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Configure Multer for file uploads ──────────────────────────────────────────
// Multer parses multipart/form-data. Use memory storage (no DB needed). :contentReference[oaicite:4]{index=4}
const upload = multer({ storage: multer.memoryStorage() });

// ─── GET placeholder for API info (optional) ────────────────────────────────────
app.get('/api/fileanalyse', (req, res) => {
  res.json({ message: 'Submit a file via POST to this endpoint.' });
});

// ─── POST /api/fileanalyse ───────────────────────────────────────────────────────
//  • Middleware `upload.single('upfile')` populates `req.file` from <input name="upfile"> :contentReference[oaicite:5]{index=5}
//  • Returns JSON: { name, type, size } :contentReference[oaicite:6]{index=6}
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

// ─── Start server ───────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
