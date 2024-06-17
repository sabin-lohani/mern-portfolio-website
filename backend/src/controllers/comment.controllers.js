import asyncHandler from "../utils/asyncHandler.js";
import Comment from "../models/comment.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Poll from "../models/poll.models.js";
import Post from "../models/post.models.js";
import mongoose from "mongoose";

export const createComment = asyncHandler(async (req, res) => {
  const { item_id, item_type, text } = req.body;

  let item;
  if (item_type === "poll") {
    item = await Poll.findById(item_id);
  } else if (item_type === "post") {
    item = await Post.findById(item_id);
  }
  if (!item) throw new ApiError(404, "Item not found");

  const newComment = await Comment.create({
    user: req.user._id,
    item_id,
    item_type,
    text,
  });

  const comment = await Comment.findById(newComment._id).populate(
    "user",
    "name image"
  );

  res.status(201).json(new ApiResponse(201, comment, "success"));
});

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

  if (comment.text !== req.body.text) comment.edited = true;
  comment.text = req.body.text;

  await comment.save();

  res.status(200).json(new ApiResponse(200, comment, "success"));
});

export const getComments = asyncHandler(async (req, res) => {
  const { item_id, item_type } = req.query;
  const userId = req.user?._id ? new mongoose.Types.ObjectId(req.user._id) : "";

  const comments = await Comment.aggregate([
    {
      $match: {
        item_id: new mongoose.Types.ObjectId(item_id),
        item_type,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $lookup: {
        from: "likes",
        let: { commentId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$item_id", "$$commentId"] },
                  { $eq: ["$item_type", "comment"] },
                  { $eq: ["$user", userId] },
                ],
              },
            },
          },
          { $limit: 1 },
        ],
        as: "user_like",
      },
    },
    {
      $addFields: {
        hasLiked: { $gt: [{ $size: "$user_like" }, 0] },
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "item_id",
        as: "likes",
      },
    },
    {
      $addFields: {
        likeCount: { $size: "$likes" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $addFields: {
        user: { $arrayElemAt: ["$user", 0] },
      },
    },
    {
      $project: {
        text: 1,
        createdAt: 1,
        hasLiked: 1,
        likeCount: 1,
      },
    },
  ]);

  res.status(200).json(new ApiResponse(200, comments, "success"));
});
