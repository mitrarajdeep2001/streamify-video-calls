import express from "express";
import { getTutorials } from "../controllers/tutorial.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getTutorials);

export default router;