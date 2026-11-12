import { type Request, type Response } from "express";
import { getAllTrails, getTrailBySlug } from "../models/trailModel";
import { formattedData } from "../controllers/util";

// Get all Trails joined with regions und build index page with trailCards
export const getAllTrailsAPI = async (req: Request, res: Response) => {
  const trails = await getAllTrails();

  res.json(trails);
};
