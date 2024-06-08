import express from "express";
import cors from "cors";
import ApiError from "./utils/ApiError.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Routes import
import authRouter from "./routes/auth.routes.js";

// Routes declaration
app.use("/api/v1/auth/", authRouter);
app.all("*", (req, res, next) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on the server`));
});

app.use(errorHandler);
export default app;
