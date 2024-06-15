import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/comment.controllers.js";
const router = express.Router();

router.route("/").post(verifyJWT, createComment).get(getComments);
router
  .route("/:id")
  .delete(verifyJWT, deleteComment)
  .patch(verifyJWT, updateComment);

export default router;
