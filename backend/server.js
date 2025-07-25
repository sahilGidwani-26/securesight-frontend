// backend/server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create or connect to SQLite DB
const db = new sqlite3.Database('./securesight.db');

// Create tables if not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS incidents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      camera TEXT,
      type TEXT,
      timestamp TEXT,
      resolved INTEGER DEFAULT 0
    )
  `);
});

// GET incidents
app.get('/api/incidents', (req, res) => {
  db.all('SELECT * FROM incidents WHERE resolved = 0', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// PATCH resolve incident
app.patch('/api/incidents/:id/resolve', (req, res) => {
  const { id } = req.params;
  db.run('UPDATE incidents SET resolved = 1 WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// Seed some data (run only once, or comment later)
app.get('/api/seed', (req, res) => {
  const seedData = [
    ['Camera 1', 'Unauthorized Access', '2025-07-01T10:30:00'],
    ['Camera 2', 'Gun Threat', '2025-07-02T14:15:00'],
    ['Camera 3', 'Loitering', '2025-07-03T16:45:00']
  ];
  const stmt = db.prepare('INSERT INTO incidents (camera, type, timestamp) VALUES (?, ?, ?)');
  seedData.forEach(item => stmt.run(item));
  stmt.finalize();
  res.send('Seeded');
});

app.listen(4000, () => console.log('✅ Backend running at http://localhost:4000'));
