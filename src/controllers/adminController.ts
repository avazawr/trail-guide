import { type Request, type Response } from "express";
import {
  getAllTrails,
  getTrailBySlug,
  deleteTrail,
} from "../models/trailModel";
import { formattedData } from "../controllers/util";

// Get all Trails joined with regions und build index page with trailCards
export const getTrailsAdmin = async (req: Request, res: Response) => {
  const trails = await getAllTrails();

  res.render("admin/admin.html", {
    trails: trails,
  });
};

export const deleteTrailsAdmin = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = req.params.id;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    res.status(400).send("Invalid id");
    return;
  }

  try {
    const result = await deleteTrail(Number(id));

    if (result) res.redirect("/admin");
    else {
      throw new Error("Entry not found");
    }
  } catch (err) {
    res.status(404).json({ error: "Entry not found" });
  }
};
