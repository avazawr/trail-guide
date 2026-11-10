import { Router } from "express";
import { getTrailPageBySlug, getTrails } from "../controllers/trailController";

const router = Router();

router.get("/", getTrails);
router.get("/trails/:slug", getTrailPageBySlug);

export default router;
