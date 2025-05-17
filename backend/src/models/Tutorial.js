import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
      unique: true, // prevent duplicate entries
    },
    title: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    language: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tutorial = mongoose.model("Tutorial", tutorialSchema);

export default Tutorial;
