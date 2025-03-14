import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// SQLite database connection
export const db = await open({
  filename: './database/games.db',
  driver: sqlite3.Database
});