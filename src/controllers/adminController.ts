import { type Request, type Response } from "express";
import {
  type TrailFormData,
  getAllTrails,
  getTrailById,
  deleteTrail,
  addTrail,
  updateTrail,
} from "../models/trailModel";
import { sanitizeDescription, slugify } from "../controllers/util";
import { getAllRegions } from "../models/regionModel";

// Get all Trails joined with regions und build index page with trailCards
export const getTrailsAdmin = async (req: Request, res: Response) => {
  const trails = await getAllTrails();

  res.render("admin/admin.html", {
    trails: trails,
  });
};

export const deleteTrailAdmin = async (
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

//getEditTrailPageAdmin
export const getEditTrailPageAdmin = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = req.params.id;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    res.status(400).send("Invalid id");
    return;
  }

  try {
    const trail = await getTrailById(id);
    const regions = await getAllRegions();

    res.render("admin/trail.html", {
      ...trail,
      regions,
    });
  } catch (err) {
    res.status(404).json({ error: "Entry not found" });
  }
};

//editTrailAdmin
export const editTrailAdmin = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    res.status(400).send("Invalid id");
    return;
  }
  try {
    //TODO A form with an empty title or distance is shown again with an error message instead of being saved

    const description = sanitizeDescription(req.body.description),
      slug = slugify(req.body.title);

    await updateTrail(Number(id), {
      ...req.body,
      slug,
      description,
    });
    res.redirect("/admin");
  } catch (err) {
    res.status(404).json({ error: "Error in database" });
  }
};

// add Trail admin Page
export const getNewTrailPageAdmin = async (req: Request, res: Response) => {
  try {
    const trail: TrailFormData = {};
    const regions = await getAllRegions();

    res.render("admin/trail.html", {
      ...trail,
      regions,
    });
  } catch (err) {
    res.status(404).json({ error: "Object creation error" });
  }
};

// add Trail admin
export const addTrailAdmin = async (req: Request, res: Response) => {
  try {
    //TODO A form with an empty title or distance is shown again with an error message instead of being saved
    const description = sanitizeDescription(req.body.description),
      slug = slugify(req.body.title);

    await addTrail({
      ...req.body,
      slug,
      description,
    });
    res.redirect("/admin");
  } catch (err) {
    res.status(404).json({ error: "Error in database" });
  }
};
