import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/User.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;
    if (!cookieHeader) {
      console.log("Socket connection rejected: No cookies provided");
      return next(new Error("Unauthorized"));
    }

    const jwtCookie = cookieHeader
      .split("; ")
      .find((row) => row.startsWith("jwt="));
    
    if (!jwtCookie) {
      console.log("Socket connection rejected: No jwt cookie found");
      return next(new Error("Unauthorized"));
    }

    const token = jwtCookie.split("=")[1];
    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized"));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
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
