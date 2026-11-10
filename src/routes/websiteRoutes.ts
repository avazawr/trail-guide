import { Router } from "express";
import { getTrails } from "../controllers/trailController";

const router = Router();

router.get("/", getTrails);

export default router;
