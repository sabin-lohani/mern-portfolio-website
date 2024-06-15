import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Like from "../models/like.models.js";
import Poll from "../models/poll.models.js";
import Post from "../models/post.models.js";
import Comment from "../models/comment.models.js";
import ApiError from "../utils/ApiError.js";

export const like = asyncHandler(async (req, res) => {
  const { item_id, item_type } = req.body;

  let item;
  if (item_type === "poll") {
    item = await Poll.findById(item_id);
  } else if (item_type === "post") {
    item = await Post.findById(item_id);
  } else if (item_type === "comment") {
    item = await Comment.findById(item_id);
  }

  if (!item) throw new ApiError(404, "Item not found");

  const like = await Like.findOne({
    user: req.user.id,
    item_id,
    item_type,
  });

  if (like) {
    await Like.findByIdAndDelete(like._id);
  } else {
    await Like.create({
      user: req.user.id,
      item_id,
      item_type,
    });
  }

  const likeCount = await Like.countDocuments({
    item_id,
    item_type,
  });
  const hasLiked = !like;

  res
    .status(200)
    .json(new ApiResponse(200, { item_id, likeCount, hasLiked }, "success"));
});
