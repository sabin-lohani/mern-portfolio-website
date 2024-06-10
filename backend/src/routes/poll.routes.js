import express from "express";
import validateSchema from "../middlewares/validateSchema.middlewares.js";
import pollSchema from "../../../schemas/poll.schemas.js";
import {
  createPoll,
  getAllPolls,
  updatePoll,
  getPollById,
  deletePoll,
  vote,
} from "../controllers/poll.controllers.js";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router
  .route("/")
  .post(verifyJWT, verifyAdmin, validateSchema(pollSchema), createPoll)
  .get(getAllPolls);
router
  .route("/:id")
  .get(getPollById)
  .put(verifyJWT, verifyAdmin, validateSchema(pollSchema), updatePoll)
  .delete(verifyJWT, verifyAdmin, deletePoll);
router.post("/:id/vote", verifyJWT, vote);

export default router;
