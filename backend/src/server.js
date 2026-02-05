import express from "express";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

const app = express();
app.use(express.json());

app.use("/api/auth/", authRoutes);

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
