import User from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.jwt || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new ApiError(401, "Unauthorized request");
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedToken?.id);
  if (!user) throw new ApiError(401, "Invalid access token");

  req.user = user;
  next();
});

export const verifyJWTIfExist = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.jwt || req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken?.id);
    req.user = user;
  }
  next();
});

export const verifyAdmin = asyncHandler(async (req, _, next) => {
  if (!req.user.isAdmin) throw new ApiError(403, "Unauthorized request");

  next();
});
