import { type Request, type Response } from "express";
import { getAllTrails, getTrailBySlug } from "../models/trailModel";
import { formattedData } from "../controllers/util";

// Get all Trails joined with regions und build index page with trailCards
export const getTrails = async (req: Request, res: Response) => {
  const trails = await getAllTrails();

  res.render("index.html", {
    trails: trails,
  });
};

// Get one Trail joined with regions by slug und build Trail detail page
export const getTrailPageBySlug = async (
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
    res
      .status(404)
      .render("404.html", { error: "Error 404: Trail not found." });
    return;
  }
  res.render("trail.html", {
    ...trail,
    data: formattedData(trail.created_at),
  });
};
