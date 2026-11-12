import { Router } from "express";
import { getAllTrailsAPI } from "../controllers/apiTrailController";

const router = Router();

router.get("/trails", getAllTrailsAPI);

export default router;
