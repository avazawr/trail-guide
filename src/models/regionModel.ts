import { getDB } from "./db";

export interface Region {
  id: number;
  name: string;
  slug: string;
  country: string;
  description?: string;
}

// Get all Regions
export async function getAllRegions(): Promise<Region[]> {
  const db = getDB();
  return db.all<Region[]>("SELECT * FROM regions");
}

// Get Regions
export async function getRegion(id: number): Promise<Region | undefined> {
  const db = getDB();
  return db.get<Region>(`SELECT * FROM regions WHERE regions.id = ?`, [id]);
}

// Get Region by Slug
export async function getRegionBySlug(
  slug: string,
): Promise<Region | undefined> {
  const db = getDB();
  return db.get<Region>(
    `SELECT *
         FROM regions
         
         WHERE regions.slug = ?`,
    [slug],
  );
}
