import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to DB");
  } catch (error) {
    console.error("Failed to connect to DB", error);
    process.exit(1);
  }
};
