// src/lib/fetch-avatars.mjs or fetch-avatars.js if using "type": "module"
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Support for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Navigate to the root directory (../../.. from src/lib/)
const ROOT_DIR = path.resolve(__dirname, "../..");
const AVATAR_DIR = path.join(ROOT_DIR, "public", "avatars");
const AVATAR_JSON = path.join(ROOT_DIR, "avatar.json");

const BASE_URLS = {
  male: "https://avatar.iran.liara.run/public/boy",
  female: "https://avatar.iran.liara.run/public/girl",
};

const TOTAL_PER_GENDER = 50;

async function downloadImage(url, filepath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  const buffer = await res.arrayBuffer();
  await fs.writeFile(filepath, Buffer.from(buffer));
}

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    console.error(`Error ensuring directory ${dir}:`, err);
  }
}

async function fetchAvatars() {
  await ensureDir(AVATAR_DIR);
  const avatars = [];

  for (const [gender, baseUrl] of Object.entries(BASE_URLS)) {
    for (let i = 1; i <= TOTAL_PER_GENDER; i++) {
      const filename = `${gender}-${i}.png`;
      const filepath = path.join(AVATAR_DIR, filename);
      const relativePath = `/public/avatars/${filename}`;

      try {
        await downloadImage(baseUrl, filepath);
        avatars.push({ gender, path: relativePath });
        console.log(`✅ Saved ${filename}`);
      } catch (error) {
        console.error(`❌ Failed to download ${filename}:`, error.message);
      }
    }
  }

  await fs.writeFile(AVATAR_JSON, JSON.stringify(avatars, null, 2));
  console.log("📦 avatar.json created/updated.");
}

fetchAvatars();
