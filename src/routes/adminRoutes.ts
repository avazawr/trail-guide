import { Router } from "express";
import {
  getTrailsAdmin,
  deleteTrailsAdmin,
} from "../controllers/adminController";

const router = Router();

router.get("/admin", getTrailsAdmin);

router.post("/admin/trails/:id/delete", deleteTrailsAdmin);

export default router;
