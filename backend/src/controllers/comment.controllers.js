import asyncHandler from "../utils/asyncHandler.js";
import Comment from "../models/comment.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) throw new ApiError(404, "Comment not found");

  if (
    req.user._id.toString() !== comment.user.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "You are not authorized to delete this comment");
  }

  await Comment.findByIdAndDelete(req.params.id);

  res.status(200).json(new ApiResponse(200, comment, "success"));
});

export const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate("user");
  if (!comment) throw new ApiError(404, "Comment not found");

  if (req.user._id.toString() !== comment.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this comment");
  }

  comment.text = req.body.text;
  comment.edited = true;

  await comment.save();

  res.status(200).json(new ApiResponse(200, comment, "success"));
});
