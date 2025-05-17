// src/lib/tutorial.js

import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Tutorial from "../models/Tutorial.js";
import { connectDB } from "./db.js";

dotenv.config();
await connectDB(); // Connect to MongoDB

const TUTORIALS_FILE = path.resolve("tutorials.json");

const predefinedLanguages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Mandarin",
  "Japanese",
  "Korean",
  "Hindi",
  "Bengali",
  "Russian",
  "Portuguese",
  "Arabic",
  "Italian",
  "Turkish",
  "Dutch",
];

const getTutorials = async (language) => {
  try {
    const params = {
      part: "snippet",
      q: `${language} tutorials 2025`,
      type: "video",
      maxResults: 48,
      relevanceLanguage: "en",
      key: process.env.YOUTUBE_API_KEY,
    };

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params,
      }
    );

    const videos = response.data?.items || [];

    // Step 1: Write `tutorials.json` if it doesn't exist
    if (!fs.existsSync(TUTORIALS_FILE)) {
      fs.writeFileSync(
        TUTORIALS_FILE,
        JSON.stringify(videos, null, 2)
      );
      console.log("✅ Created tutorials.json");
    }

    for (const item of videos) {
      const videoId = item.id?.videoId;
      if (!videoId) continue;

      const exists = await Tutorial.findOne({ videoId });
      if (exists) continue;

      const tutorial = new Tutorial({
        videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails?.default?.url || "",
        language,
      });

      await tutorial.save();
    }

    return { message: `${videos.length} videos processed for ${language}.` };
  } catch (error) {
    console.error("Error fetching or saving tutorials:", error.message);
    throw new Error("Failed to fetch and save tutorials.");
  }
};

// Step 3: Loop through all languages and fetch/save tutorials
for (const language of predefinedLanguages) {
  try {
    const result = await getTutorials(language);
    console.log(result.message);
  } catch (error) {
    console.error(`❌ Error processing ${language}:`, error.message);
  }
}
