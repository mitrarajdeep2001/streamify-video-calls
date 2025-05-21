import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["friend_request"],
      required: true,
    },
    message: {
      type: String,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    actionTaken: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
