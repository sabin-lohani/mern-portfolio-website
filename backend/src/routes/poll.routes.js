import express from "express";
import validateSchema from "../middlewares/validateSchema.middlewares.js";
import pollSchema from "../schemas/poll.schemas.js";
import {
  createPoll,
  getAllPolls,
  updatePoll,
  deletePoll,
  vote,
  getSinglePoll,
} from "../controllers/poll.controllers.js";
import {
  verifyAdmin,
  verifyJWT,
  verifyJWTIfExist,
} from "../middlewares/auth.middlewares.js";

const router = express.Router();

router
  .route("/")
  .post(verifyJWT, verifyAdmin, validateSchema(pollSchema), createPoll)
  .get(verifyJWTIfExist, getAllPolls);
router
  .route("/:id")
  .get(verifyJWTIfExist, getSinglePoll)
  .put(verifyJWT, verifyAdmin, validateSchema(pollSchema), updatePoll)
  .delete(verifyJWT, verifyAdmin, deletePoll);
router.post("/:id/vote", verifyJWT, vote);

export default router;
