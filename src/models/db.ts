import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";

const DB_PATH = process.env.DB_PATH;

let db: Database | null = null;

export async function connectDB(): Promise<Database> {
  if (db) return db;

  if (!DB_PATH) {
    throw new Error("DB_PATH is not defined");
  }
  db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

  await db.run("PRAGMA foreign_keys = ON");

  return db;
}

export function getDB(): Database {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db;
}

export async function closeDB(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}
