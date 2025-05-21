import Notification from "../models/Notification.js";

// GET /:userId?limit=10&page=1&sort=asc|desc
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      Notification.find({ recipient: userId })
        .sort({ createdAt: sortDirection })
        .skip(skip)
        .limit(limit)
        .populate("sender", "username profilePicture"),

      Notification.countDocuments({ recipient: userId }),
    ]);

    res.status(200).json({
      notifications,
      pagination: {
        totalItems: total,
        currentPage: 1,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// GET /:userId/unread/count - Get unread notification count
export const getUnreadNotificationCount = async (req, res) => {
  try {
    const userId = req.user.id;

    const count = await Notification.countDocuments({
      recipient: userId,
      isRead: false,
    });

    res.status(200).json({ unreadCount: count });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch unread count" });
  }
};

// PATCH /read - Mark all as read
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await Notification.updateMany(
      { recipient: userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "All notifications marked as read", result });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark notifications as read" });
  }
};


// DELETE /:id - Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete notification" });
  }
};

// DELETE /user/:userId - Delete all notifications for a user
export const deleteAllNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await Notification.deleteMany({ recipient: userId });

    res.status(200).json({
      message: "All notifications deleted",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete notifications" });
  }
};
