import express from "express";
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessages,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(protectRoute);
router.get("/contacts", getAllContacts);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessages);

export default router;
