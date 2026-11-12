import { type Request, type Response } from "express";
import { getAllRegions, getRegionBySlug } from "../models/regionModel";
import { getTrailsByRegionId } from "../models/trailModel";

// Get all Regions
export const getRegionsAPI = async (req: Request, res: Response) => {
  const regions = await getAllRegions();

  res.json(regions);
};

// Get all Trails from one Region
export const getTrailsByRegionAPI = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  const slug = req.params.slug;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    res.status(400).json({ error: "Invalid slug" });
    return;
  }

  const region = await getRegionBySlug(slug);

  if (!region) {
    res.status(404).json({ error: "Region not found." });
    return;
  }

  const trails = await getTrailsByRegionId(region.id);

  res.json(trails);
};
