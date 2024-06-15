import express from "express";
import {
  verifyJWT,
  verifyJWTIfExist,
} from "../middlewares/auth.middlewares.js";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/comment.controllers.js";
const router = express.Router();

router
  .route("/")
  .post(verifyJWT, createComment)
  .get(verifyJWTIfExist, getComments);
router
  .route("/:id")
  .delete(verifyJWT, deleteComment)
  .patch(verifyJWT, updateComment);

export default router;
