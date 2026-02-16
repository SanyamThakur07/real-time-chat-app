import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/User.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.hanshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      .split("=")[1];

    if (!token) {
      console.log("Socket connections rejected: No token provided");
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      next(new Error("Unauthorized"));
    }

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      next(new Error("User not found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();

    console.log(
      `Socket authenticated for user: ${user.fullName} (${user._id})`,
    );
    next();
  } catch (error) {
    console.log("Error in socket connection: ", error);
    next(new Error("Unauthorized"));
  }
};
