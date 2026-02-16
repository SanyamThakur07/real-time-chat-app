import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use("/api/auth/", authRoutes);
app.use("/api/messages/", messageRoutes);

// Serve frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// React fallback
app.get("*path", (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(ENV.PORT, () => {
  console.log("Server running on: " + process.env.PORT);
  connectDB();
});
