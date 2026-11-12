import { Router } from "express";
import {
  getAllTrailsAPI,
  getTrailBySlugAPI,
  createTrailAPI,
  editTrailAPI,
  deleteTrailAPI,
} from "../controllers/apiTrailController";
import {
  getRegionsAPI,
  getTrailsByRegionAPI,
} from "../controllers/apiRegionController";
import { apiKey } from "../middleware/apiKey";
import { limiting } from "../middleware/limiting";

const router = Router();

router.get("/trails", getAllTrailsAPI);
router.get("/trails/:slug", getTrailBySlugAPI);

router.get("/regions", getRegionsAPI);

router.get("/regions/:slug/trails", getTrailsByRegionAPI);

router.use(apiKey);
router.use(limiting);
router.post("/trails", createTrailAPI);

router.post("/trails/:id", editTrailAPI);

router.delete("/trails/:id", deleteTrailAPI);

export default router;
