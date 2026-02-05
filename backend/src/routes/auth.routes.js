import expres from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = expres.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
