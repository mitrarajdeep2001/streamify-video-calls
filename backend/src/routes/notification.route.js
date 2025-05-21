import express from "express";
import {
  getNotifications,
  deleteNotification,
  deleteAllNotifications,
  getUnreadNotificationCount,
  markAllAsRead,
} from "../controllers/notification.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// PATCH mark all notification as read
router.patch("/read", protectRoute, markAllAsRead);

// DELETE a notification
router.delete("/:id", protectRoute, deleteNotification);

// DELETE all notifications for a user
router.delete("/user/:userId", protectRoute, deleteAllNotifications);

// GET all notifications for a user
router.get("/", protectRoute, getNotifications);

// GET unread notification count for a user
router.get("/unread/count", protectRoute, getUnreadNotificationCount);

export default router;