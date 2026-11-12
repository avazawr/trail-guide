import { type Request, type Response } from "express";
import {
  type TrailFormData,
  getAllTrails,
  getTrailById,
  deleteTrail,
  addTrail,
  updateTrail,
} from "../models/trailModel";
import { sanitize, slugify } from "../controllers/util";
import { getAllRegions } from "../models/regionModel";
import { error } from "node:console";

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

// validate und create errors object
function validateTrailInput(title: string, distance: string) {
  const errors: { title?: string; distance_km?: string } = {};

  if (!title) {
    errors.title = "Title must be filled";
  }

  if (!distance) {
    errors.distance_km = "Distance must be filled";
  }
  return errors;
}

//editTrailAdmin
export const editTrailAdmin = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    res.status(400).send("Invalid id");
    return;
  }
  try {
    const title = sanitize(req.body.title);
    const description = sanitize(req.body.description);
    const slug = slugify(req.body.title);

    const errors = validateTrailInput(title, sanitize(req.body.distance_km));

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ errors });
      return;
    }

    await updateTrail(Number(id), {
      ...req.body,
      title,
      slug,
      description,
    });
    res.json({ redirectUrl: "/admin" });
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
    const title = sanitize(req.body.title);
    const description = sanitize(req.body.description);
    const slug = slugify(req.body.title);

    const errors = validateTrailInput(title, sanitize(req.body.distance_km));

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ errors });
      return;
    }

    await addTrail({
      ...req.body,
      title,
      slug,
      description,
    });
    res.json({ redirectUrl: "/admin" });
  } catch (err) {
    res.status(404).json({ error: "Error in database" });
  }
};
