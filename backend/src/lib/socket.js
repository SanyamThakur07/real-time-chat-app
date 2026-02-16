import { Server } from "socket.io";
import express from "express";
import http from "http";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ENV.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST"],
  },
  allowEIO3: true,
});

io.use(socketAuthMiddleware);

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.user.fullName, "ID:", socket.userId);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;
  
  console.log("Socket map updated:", userSocketMap);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server, userSocketMap };
