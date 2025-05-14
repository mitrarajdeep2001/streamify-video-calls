import express from "express";
import { getTutorials } from "../controllers/tutorial.controller.js";

const router = express.Router();

router.get("/", getTutorials);

export default router;