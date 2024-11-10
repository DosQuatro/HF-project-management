const express = require('express');
    const sqlite3 = require('sqlite3').verbose();
    const cors = require('cors');
    const app = express();
    const port = 3000;

    // Middleware
    app.use(express.json());
    app.use(cors());

    // Database setup
    const db = new sqlite3.Database('./projects.db');

    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        type TEXT,
        requestor TEXT,
        due_date TEXT,
        start_date TEXT,
        short_description TEXT,
        details TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )`);
    });

    // API endpoint to create a new project
    app.post('/api/projects', (req, res) => {
      const { name, type, requestor, dueDate, startDate, shortDescription, details } = req.body;
      const stmt = db.prepare(`INSERT INTO projects (name, type, requestor, due_date, start_date, short_description, details) VALUES (?, ?, ?, ?, ?, ?, ?)`);
      stmt.run(name, type, requestor, dueDate, startDate, shortDescription, details, function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
      });
      stmt.finalize();
    });

    // API endpoint to fetch all projects
    app.get('/api/projects', (req, res) => {
      db.all(`SELECT * FROM projects ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(rows);
      });
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
