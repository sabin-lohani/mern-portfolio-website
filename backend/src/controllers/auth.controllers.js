import axios from "axios";
import jwt from "jsonwebtoken";
import oauth2Client from "../utils/oauth2client.js";
import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIMEOUT,
  });
};

// Create and send Cookie ->
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN),
    httpOnly: true,
    path: "/",
    secure: false,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
    cookieOptions.sameSite = "none";
  }

  res.cookie("jwt", token, cookieOptions);

  res
    .status(statusCode)
    .json(new ApiResponse(statusCode, { token, user }, "success"));
};

/* GET Google Authentication API. */
export const googleAuth = asyncHandler(async (req, res, _) => {
  const code = req.query.code;
  const googleRes = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(googleRes.tokens);

  const userRes = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
  );

  let user = await User.findOne({ email: userRes.data.email });

  if (!user) {
    user = await User.create({
      name: userRes.data.name,
      email: userRes.data.email,
      image: userRes.data.picture,
    });
  }

  createSendToken(user, 201, res);
});

export const me = asyncHandler(async (req, res, _) => {
  const user = await User.findById(req.user.id);

  res.status(200).json(new ApiResponse(200, user, "success"));
});

export const logout = asyncHandler(async (req, res, _) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    path: "/",
  });

  res.status(200).json(new ApiResponse(200, null, "success"));
});
