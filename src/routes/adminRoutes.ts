import { Router } from "express";
import {
  getTrailsAdmin,
  deleteTrailAdmin,
  getEditTrailPageAdmin,
  editTrailAdmin,
  getNewTrailPageAdmin,
  addTrailAdmin,
} from "../controllers/adminController";

const router = Router();

router.get("/admin", getTrailsAdmin);

router.post("/admin/trails/:id/delete", deleteTrailAdmin);

router.get("/admin/trails/:id/edit", getEditTrailPageAdmin);
router.post("/admin/trails/:id", editTrailAdmin);

router.get("/admin/trails/new", getNewTrailPageAdmin);
router.post("/admin/trails", addTrailAdmin);

export default router;
