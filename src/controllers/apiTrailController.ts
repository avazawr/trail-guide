import { type Request, type Response } from "express";
import {
  getAllTrails,
  getTrailBySlug,
  addTrail,
  updateTrail,
  deleteTrail,
  validateObjectAsTrailCreateObject,
} from "../models/trailModel";
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
    res.status(400).json({ error: "Invalid slug" });
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

// Write endpoints with an API key
export const createTrailAPI = async (req: Request, res: Response) => {
  // validate req.body
  const { trail, error } = await validateObjectAsTrailCreateObject(req.body);

  if (!trail) {
    res.status(400).json({ error: error });
    return;
  }

  let updated: boolean = false;
  try {
    updated = await addTrail(trail);
  } catch (err) {
    res.status(400).json({ error: "Error in database" });
  }

  if (updated) res.status(200).json(trail);
  else {
    res.status(404).json({ error: "Trail not found" });
  }
};

export const editTrailAPI = async (req: Request, res: Response) => {
  // validate req.body
  const id = req.params.id;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const { trail, error } = await validateObjectAsTrailCreateObject(req.body);

  if (!trail) {
    res.status(400).json({ error: error });
    return;
  }

  const updated = await updateTrail(Number(id), trail);

  if (updated) res.status(200).json(trail);
  else {
    res.status(404).json({ error: "Trail not found" });
  }
};

export const deleteTrailAPI = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const deleted = await deleteTrail(Number(id));

  if (deleted) res.status(204).json({});
  else {
    res.status(404).json({ error: "Trail not found" });
  }
};
