import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import tutorialRoutes from "./routes/tutorial.route.js";
import promptRoutes from "./routes/prompt.route.js";
import notificationRoutes from "./routes/notification.route.js";
import othersRoutes from "./routes/others.route.js";

import { connectDB } from "./lib/db.js";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT;

// const __dirname = path.resolve();

const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.0.202:5173",
  "https://t9g6xnd1-5173.inc1.devtunnels.ms",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(express.json());
app.use(cookieParser());

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go up one level to reach the project root
const rootDir = path.join(__dirname, "..");

// Serve static files from the root public directory
app.use("/public", express.static(path.join(rootDir, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/tutorials", tutorialRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/others", othersRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
