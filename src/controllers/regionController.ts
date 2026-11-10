import { type Request, type Response } from "express";
import { getAllRegions, getRegionBySlug } from "../models/regionModel";
import { getTrailsByRegionId } from "../models/trailModel";

// Get all Regions build Regions page with regionsCards
export const getRegions = async (req: Request, res: Response) => {
  const regions = await getAllRegions();

  res.render("regions.html", {
    regions,
  });
};

// Get one Region joined with Trail by slug und build Region detail page
export const getRegionPageBySlug = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  const slug = req.params.slug;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    res.status(400).send("Invalid slug");
    return;
  }

  const region = await getRegionBySlug(slug);

  if (!region) {
    res
      .status(404)
      .render("404.html", { error: "Error 404: Region not found." });
    return;
  }

  const trails = await getTrailsByRegionId(region.id);

  res.render("region.html", {
    region,
    trails,
  });
};
