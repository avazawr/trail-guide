import { Router } from "express";
import { getTrailPageBySlug, getTrails } from "../controllers/trailController";
import {
  getRegions,
  getRegionPageBySlug,
} from "../controllers/regionController";

const router = Router();

router.get("/", getTrails);
router.get("/trails/:slug", getTrailPageBySlug);

router.get("/regions", getRegions);
router.get("/regions/:slug", getRegionPageBySlug);

export default router;
