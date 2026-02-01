import express from "express";
import path from "path";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

const app = express();
dotenv.config();

app.use("/api/auth/", authRoutes);

// Serve frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// React fallback
app.get("*path", (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(process.env.PORT, () =>
  console.log("Server running on: " + process.env.PORT),
);
