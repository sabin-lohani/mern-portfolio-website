import express from "express";
import {
  createPost,
  getPosts,
  deletePost,
  deleteImage,
  getPost,
  updatePost,
} from "../controllers/post.controllers.js";
import {
  verifyJWT,
  verifyAdmin,
  verifyJWTIfExist,
} from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import validateSchema from "../middlewares/validateSchema.middlewares.js";
import postSchema from "../schemas/post.schemas.js";

const router = express.Router();

router
  .route("/")
  .post(
    verifyJWT,
    verifyAdmin,
    upload.array("images"),
    validateSchema(postSchema),
    createPost
  )
  .get(verifyJWTIfExist, getPosts);
router
  .route("/:id")
  .delete(verifyJWT, verifyAdmin, deletePost)
  .get(verifyJWTIfExist, getPost)
  .patch(
    verifyJWT,
    verifyAdmin,
    upload.array("images"),
    validateSchema(postSchema),
    updatePost
  );
router.delete("/:id/images/:imageId", verifyJWT, verifyAdmin, deleteImage);

export default router;
