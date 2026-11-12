import { type Request, type Response } from "express";
import { getAllTrails, getTrailBySlug } from "../models/trailModel";
import { formattedData } from "../controllers/util";

// Get all Trails joined with regions
export const getAllTrailsAPI = async (req: Request, res: Response) => {
  const trails = await getAllTrails();

  res.json(trails);
};

// Get one Trail joined with regions by slug
export const getTrailBySlugAPI = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  const slug = req.params.slug;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    res.status(400).send("Invalid slug");
    return;
  }

  const trail = await getTrailBySlug(slug);

  if (!trail) {
    res.status(404).json({ error: "Trail not found." });
    return;
  }
  res.json({
    ...trail,
    data: formattedData(trail.created_at),
  });
};
