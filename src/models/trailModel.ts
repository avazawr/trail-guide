import { getDB } from "./db";

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

export type TrailFormData = Partial<Trail>;

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
export async function getTrailBySlug(
  slug: string,
): Promise<TrailWithRegion | undefined> {
  const db = getDB();
  return db.get<TrailWithRegion>(
    `SELECT trails.*,
            regions.name AS region_name,
            regions.country AS region_country
     FROM trails
     LEFT JOIN regions ON trails.region_id = regions.id
     WHERE trails.slug = ?`,
    [slug],
  );
}
// Get one Trail joined with region by id
export async function getTrailById(
  id: string,
): Promise<TrailWithRegion | undefined> {
  const db = getDB();
  return db.get<TrailWithRegion>(
    `SELECT trails.*,
            regions.name AS region_name,
            regions.country AS region_country
     FROM trails
     LEFT JOIN regions ON trails.region_id = regions.id
     WHERE trails.id = ?`,
    [id],
  );
}

// Get all Trails from the Region
export async function getTrailsByRegionId(
  regionId: number,
): Promise<TrailWithRegion[]> {
  const db = getDB();
  return db.all<TrailWithRegion[]>(
    `SELECT 
      trails.*, regions.name AS region_name, regions.country AS region_country 
    FROM trails 
    LEFT JOIN regions ON trails.region_id = regions.id 
    WHERE trails.region_id = ?
    ORDER BY trails.created_at DESC`,
    [regionId],
  );
}

// Delete Trail
export async function deleteTrail(id: number): Promise<boolean> {
  const db = getDB();
  const result = await db.run("DELETE FROM trails WHERE id = ?", id);
  return result.changes !== undefined && result.changes > 0;
}

// Add new Trail
export async function addTrail(data: Trail): Promise<boolean> {
  const db = getDB();

  const result = await db.run(
    `INSERT INTO trails (
      region_id,
      title,
      slug,
      difficulty,
      distance_km,
      created_at,
      description,
      image_url
    )
    VALUES (
      @region_id,
      @title,
      @slug,
      @difficulty,
      @distance_km,
      @created_at,
      @description,
      @image_url
    )`,
    {
      "@region_id": data.region_id,
      "@title": data.title,
      "@slug": data.slug,
      "@difficulty": data.difficulty,
      "@distance_km": data.distance_km,
      "@created_at": Math.floor(Date.now() / 1000),
      "@description": data.description ?? null,
      "@image_url": data.image_url ?? null,
    },
  );

  return result.changes !== undefined && result.changes > 0;
}

// Edit Trail
export async function updateTrail(id: number, data: Trail): Promise<boolean> {
  const db = getDB();

  const result = await db.run(
    `UPDATE trails
     SET region_id = @region_id,
         title = @title,
         slug = @slug,
         difficulty = @difficulty,
         distance_km = @distance_km,
         description = @description,
         image_url = @image_url
     WHERE id = @id`,
    {
      "@region_id": data.region_id,
      "@title": data.title,
      "@slug": data.slug,
      "@difficulty": data.difficulty,
      "@distance_km": data.distance_km,
      "@description": data.description ?? null,
      "@image_url": data.image_url ?? null,
      "@id": id,
    },
  );

  return result.changes !== undefined && result.changes > 0;
}
