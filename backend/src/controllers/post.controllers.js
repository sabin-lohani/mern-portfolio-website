import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import Post from "../models/post.models.js";
import { deleteByPublicId, uploadToCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import Like from "../models/like.models.js";
import Comment from "../models/comment.models.js";

export const createPost = asyncHandler(async (req, res) => {
  const { title, subtitle, content } = req.body;
  const images = req.files?.map((file) => file.path) || [];

  const postExist = await Post.findOne({ title });
  if (postExist) throw new ApiError(400, "Post already exist");

  const cloudinaryUrls = await Promise.all(
    images.map(async (localPath) => {
      const { url, public_id } = await uploadToCloudinary(
        localPath,
        "/ProductAssets"
      );
      return { url, public_id };
    })
  );

  const newPost = await Post.create({
    title,
    subtitle,
    content,
    images: cloudinaryUrls,
    user: req.user._id,
  });

  const post = await Post.findById(newPost._id).populate("user", "name image");

  res.status(201).json(new ApiResponse(201, post, "success"));
});

export const getPosts = asyncHandler(async (req, res) => {
  const { page = 1, perPage = 8 } = req.query;
  const paginateOptions = {
    page: parseInt(page),
    limit: parseInt(perPage),
    sort: { createdAt: -1 },
  };
  const userId = new mongoose.Types.ObjectId(req.user?._id);

  const postsAggregate = Post.aggregate([
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
                  { $eq: ["$item_type", "post"] },
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
        user_like: 0,
        likes: 0,
      },
    },
  ]);

  Post.aggregatePaginate(postsAggregate, paginateOptions, (err, result) => {
    if (err) throw new ApiError(500, "Error fetching posts");

    res.status(200).json(new ApiResponse(200, result, "success"));
  });
});

export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) throw new ApiError(404, "Post not found");

  await Post.findByIdAndDelete(id);
  await Promise.all(
    post.images?.map(async (image) => {
      await deleteByPublicId(image.public_id);
    })
  );

  res.status(200).json(new ApiResponse(200, post, "Post deleted successfully"));
});

export const deleteImage = asyncHandler(async (req, res) => {
  const { id, imageId } = req.params;
  const post = await Post.findById(id);
  if (!post) throw new ApiError(404, "Post not found");

  const image = post.images.find((img) => img._id == imageId);
  if (!image) throw new ApiError(404, "Image not found");

  await deleteByPublicId(image.public_id);
  post.images = post.images.filter((img) => img._id != imageId);
  await post.save();

  res
    .status(200)
    .json(new ApiResponse(200, image, "Image deleted successfully"));
});

export const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const postQuery = mongoose.isValidObjectId(id)
    ? Post.findById(id).populate("user", "name image")
    : Post.findOne({ slug: id }).populate("user", "name image");

  const post = await postQuery;
  if (!post) throw new ApiError(404, "Post not found");

  const likes = await Like.find({
    item_id: post._id,
    item_type: "post",
  }).populate("user");

  const comments = await Comment.find({
    item_id: post._id,
    item_type: "post",
  }).populate("user");

  res.status(200).json(
    new ApiResponse(
      200,
      {
        ...post.toObject(),
        comments,
        commentCount: comments.length,
        likes,
        likeCount: likes.length,
        hasLiked: likes.some(
          (like) => like.user?._id.toString() === req.user?._id.toString()
        ),
      },
      "success"
    )
  );
});

export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("user", "name image");
  if (!post) throw new ApiError(404, "Post not found");

  const { title, subtitle, content } = req.body;
  const images = req.files?.map((file) => file.path) || [];

  const cloudinaryUrls = await Promise.all(
    images.map(async (localPath) => {
      const { url, public_id } = await uploadToCloudinary(
        localPath,
        "/ProductAssets"
      );
      return { url, public_id };
    })
  );

  post.title = title;
  post.subtitle = subtitle;
  post.content = content;
  post.images = post.images.concat(cloudinaryUrls);
  await post.save();

  res.status(200).json(new ApiResponse(200, post, "Post updated successfully"));
});
