import express, { Request, Response } from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

interface Game {
  id: number;
  title: string;
  price: number;
  genres: string;
  platform: string;
  image_url?: string;
}

const app = express();
const port = 3001;
const db = new sqlite3.Database('./database/games.db');

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST']
}));
app.use(express.json());
app.use(express.static('public'));

// Get all games
app.get('/api/games', (req: Request, res: Response<Game[] | { error: string }>) => {
  console.log("Requesting games")

  db.all('SELECT * FROM games', (err: Error, rows: Game[]) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add new game
app.post('/api/games', (req: Request<{}, {}, Game>, res: Response<{ id: number } | {error: string}>) => {
  const { title, price, genres, platform, image_url } = req.body;
  
  db.run(
    'INSERT INTO games (title, price, genres, platform, image_url) VALUES (?, ?, ?, ?, ?)',
    [title, price, genres, platform, image_url],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
