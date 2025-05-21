import Notification from "../models/Notification.js";

// Create a new notification
const createNotification = async (data) => {
  try {
    const { recipient, sender, type, message, entityId, actionTaken } = data;

    const notification = new Notification({
      recipient,
      sender,
      type,
      message,
      entityId,
      actionTaken,
    });

    await notification.save();
    return "Notification created successfully";
  } catch (err) {
    console.error("Error creating notification:", err);
    throw new Error("Failed to create notification");
  }
};

// Mark action taken true for a notification
// This is used when the user has taken action on the notification
const markActionTaken = async (entityId) => {
  try {
    const notification = await Notification.findOne({
      entityId,
    });
    if (!notification) {
      throw new Error("Notification not found");
    }

    notification.actionTaken = true;
    await notification.save();
  } catch (err) {
    console.error("Error marking action taken:", err);
    throw new Error("Failed to mark action taken");
  }
};

export { createNotification, markActionTaken };
