import express from "express";

const router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";
import generateRandomAvatar from "../controllers/others.controller.js";

router.use(protectRoute);

router.get("/generate/random-avatar", generateRandomAvatar);

export default router;