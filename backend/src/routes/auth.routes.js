import express from "express";
import { googleAuth, me, logout } from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.get("/google", googleAuth);
router.post("/logout", logout);
router.get("/", verifyJWT, me);

export default router;
