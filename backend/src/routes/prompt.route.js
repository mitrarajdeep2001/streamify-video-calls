import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { generatePrompt } from "../controllers/prompt.controller.js";

const router = express.Router();

router.post("/generate",  generatePrompt);

export default router;