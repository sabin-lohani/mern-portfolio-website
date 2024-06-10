import Poll from "../models/poll.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const createPoll = asyncHandler(async (req, res) => {
  const { question, options } = req.body;

  const poll = await Poll.create({
    question,
    options,
  });

  res.status(201).json(new ApiResponse(201, poll, "success"));
});

export const getAllPolls = async (req, res) => {
  const polls = await Poll.find().sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, polls, "success"));
};

export const getPollById = asyncHandler(async (req, res) => {
  const poll = await Poll.findById(req.params.id);

  if (!poll) throw new ApiError(404, "Poll not found");

  res.status(200).json(new ApiResponse(200, poll, "success"));
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
  console.log(req.body);

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
