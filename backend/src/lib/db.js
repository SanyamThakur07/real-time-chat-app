import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Successfully connected to DB");
  } catch (error) {
    console.error("Failed to connect to DB", error);
    process.exit(1);
  }
};
