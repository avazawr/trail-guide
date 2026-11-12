import { Router } from "express";
import {
  getAllTrailsAPI,
  getTrailBySlugAPI,
} from "../controllers/apiTrailController";
import {
  getRegionsAPI,
  getTrailsByRegionAPI,
} from "../controllers/apiRegionController";

const router = Router();

router.get("/trails", getAllTrailsAPI);
router.get("/trails/:slug", getTrailBySlugAPI);

router.get("/regions", getRegionsAPI);

router.get("/regions/:slug/trails", getTrailsByRegionAPI);

export default router;
