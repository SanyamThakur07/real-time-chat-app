import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/User.js";

export const protectRoute = (res, req, next) => {
  try {
    const token = req.cookie.jwt;
    if (!token) res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify("jwt", ENV.JWT_SECRET);
    if (!decoded) res.status(401).json({ message: "Unauthorized" });

    const user = User.findById(decoded.userId).select("-password");
    if (!user) res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in middleware: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
