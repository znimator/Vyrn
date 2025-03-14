import { db } from './db';
import { Game } from './types';

const games: Game[] = [
  {
    title: 'Minecraft',
    originalPrice: 20.99,
    discountPercentage: 20,
    genres: ['Sandbox', 'Adventure'],
    platform: 'PC',
    imageUrl: '/images/games/minecraft.jpg' // Changed path for web access
  },
  {
    title: 'Team Fortress 2',
    originalPrice: 0,
    genres: ['Action', 'Shooter'],
    platform: 'PC',
    imageUrl: '/images/games/tf2.jpg'
  }
];

async function insertGames() {
  try {

    await db.exec(`
      CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        original_price REAL NOT NULL,
        discount_percentage REAL,
        genres TEXT NOT NULL,
        platform TEXT NOT NULL,
        image_url TEXT NOT NULL
      )
    `);

    for (const game of games) {
      await db.run(
        `INSERT INTO games 
        (title, original_price, discount_percentage, genres, platform, image_url) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          game.title,
          game.originalPrice,
          game.discountPercentage || null,
          game.genres.join(', '), // Convert array to comma-separated string
          game.platform,
          game.imageUrl
        ]
      );
    }
    console.log('Games inserted successfully!');
  } catch (err) {
    console.error('Error inserting games:', err);
  } finally {
    db.close();
  }
}

insertGames();