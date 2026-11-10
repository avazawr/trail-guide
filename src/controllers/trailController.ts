import { type Request, type Response } from "express";
import { getAllTrails } from "../models/trailModel";

// Get all Trails joined with regions und build index page with trailCards
export const getTrails = async (req: Request, res: Response) => {
  const trails = await getAllTrails();

  console.log(trails);

  res.render("index.html", {
    trails: trails,
  });
};
