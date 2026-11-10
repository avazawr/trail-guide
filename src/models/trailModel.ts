import { getDB } from "./db";

export interface Region {
  id: number;
  name: string;
  slug: string;
  country: string;
  description?: string;
}

export interface Trail {
  id: number;
  region_id: number;
  title: string;
  slug: string;
  difficulty: "easy" | "moderate" | "hard";
  distance_km: number;
  created_at: number;
  description?: string;
  image_url?: string;
}

export interface TrailWithRegion extends Trail {
  region_name: string;
  region_country: string;
}

// Get all Trails joined with regions
export async function getAllTrails(): Promise<TrailWithRegion[]> {
  const db = getDB();
  return db.all<TrailWithRegion[]>(
    `SELECT 
        trails.*, regions.name AS region_name, regions.country AS region_country 
    FROM trails 
    LEFT JOIN regions ON trails.region_id = regions.id 
    ORDER BY trails.created_at DESC`,
  );
}

// Get one Trail joined with region by slug
export async function getTrailBySlug(slug: string) {
  const db = getDB();
}
