import Poll from "../models/poll.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import Like from "../models/like.models.js";
import Comment from "../models/comment.models.js";
import mongoose from "mongoose";

export const createPoll = asyncHandler(async (req, res) => {
  const { question, options } = req.body;

  const poll = await Poll.create({
    question,
    options,
  });

  res.status(201).json(new ApiResponse(201, poll, "success"));
});

export const getAllPolls = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;
  const paginateOptions = {
    page: parseInt(page),
    limit: parseInt(perPage),
    sort: { createdAt: -1 },
  };
  const userId = new mongoose.Types.ObjectId(req.user?._id);

  const pollsAggregate = Poll.aggregate([
    {
      $sort: { createdAt: -1 },
    },
    {
      $lookup: {
        from: "likes",
        let: { pollId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$item_id", "$$pollId"] },
                  { $eq: ["$item_type", "poll"] },
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
      $project: {
        user_like: 0,
        likes: 0,
      },
    },
  ]);

  Poll.aggregatePaginate(pollsAggregate, paginateOptions, (err, result) => {
    if (err) throw new ApiError(500, "Error fetching polls");

    res.status(200).json(new ApiResponse(200, result, "success"));
  });
};

export const getSinglePoll = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const pollQuery = mongoose.isValidObjectId(id)
    ? Poll.findById(id)
    : Poll.findOne({ slug: id });

  const poll = await pollQuery;
  if (!poll) throw new ApiError(404, "Poll not found");

  const likes = await Like.find({
    item_id: poll._id,
    item_type: "poll",
  }).populate("user");

  const comments = await Comment.find({
    item_id: poll._id,
    item_type: "poll",
  }).populate("user");

  res.status(200).json(
    new ApiResponse(
      200,
      {
        ...poll.toObject(),
        comments,
        commentCount: comments.length,
        likes,
        likeCount: likes.length,
        hasLiked: likes.some(
          (like) => like.user._id.toString() === req.user._id.toString()
        ),
      },
      "success"
    )
  );
});

export const updatePoll = asyncHandler(async (req, res) => {
  const { question, options } = req.body;

  const poll = await Poll.findById(req.params.id);

  if (!poll) throw new ApiError(404, "Poll not found");

  poll.question = question;
  poll.options = options;

  await poll.save();

  res.status(200).json(new ApiResponse(200, poll, "success"));
});

export const deletePoll = asyncHandler(async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  if (!poll) throw new ApiError(404, "Poll not found");

  await Poll.findByIdAndDelete(req.params.id);

  res.status(200).json(new ApiResponse(200, poll, "success"));
});

export const vote = asyncHandler(async (req, res) => {
  const { optionId } = req.body;

  const poll = await Poll.findById(req.params.id);
  if (!poll) throw new ApiError(404, "Poll not found");

  const option = poll.options.find((option) => option._id == optionId);
  if (!option) throw new ApiError(404, "Option not found");

  // Check if the user has already voted
  poll.options.forEach((opt) => {
    if (opt.votes.includes(req.user._id)) {
      opt.votes = opt.votes.filter(
        (vote) => vote.toString() !== req.user._id.toString()
      );
    }
  });

  option.votes.push(req.user._id);
  await poll.save();

  res.status(200).json(new ApiResponse(200, poll, "success"));
});

export const likePoll = asyncHandler(async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  if (!poll) throw new ApiError(404, "Poll not found");

  let like = await Like.findOne({
    item_id: req.params.id,
    item_type: "poll",
    user: req.user._id,
  });

  if (!like) {
    like = await Like.create({
      item_id: req.params.id,
      item_type: "poll",
      user: req.user._id,
    });
  }

  res.status(200).json(new ApiResponse(200, like, "success"));
});

export const unlikePoll = asyncHandler(async (req, res) => {
  const like = await Like.findOneAndDelete({
    item_id: req.params.id,
    item_type: "poll",
    user: req.user._id,
  });

  res.status(200).json(new ApiResponse(200, like, "success"));
});

export const commentOnPoll = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const poll = await Poll.findById(req.params.id);
  if (!poll) throw new ApiError(404, "Poll not found");

  const newComment = await Comment.create({
    user: req.user._id,
    item_id: req.params.id,
    item_type: "poll",
    text,
  });

  const comment = await newComment.populate("user");

  res.status(201).json(new ApiResponse(201, comment, "success"));
});
