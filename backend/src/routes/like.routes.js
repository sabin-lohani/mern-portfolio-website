import express from "express";
const router = express.Router();
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { like } from "../controllers/like.controllers.js";

router.route("/").post(verifyJWT, like);

export default router;
