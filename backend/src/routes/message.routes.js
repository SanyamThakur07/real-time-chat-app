import express from "express";
import { getAllContacts } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(protectRoute);
router.get("/contacts", getAllContacts);

export default router;
