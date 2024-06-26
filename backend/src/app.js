import express from "express";
import cors from "cors";
import ApiError from "./utils/ApiError.js";
import errorHandler from "./middlewares/errorHandler.middlewares.js";
import cookieParser from "cookie-parser";

const app = express();

// Middleware to log request origin and allowed origin
app.use((req, res, next) => {
  console.log(`Request Origin: ${req.headers.origin}`);
  console.log(`Allowed Origin: ${process.env.CORS_ORIGIN}`);
  next();
});

const whitelist = process.env.CORS_ORIGIN.split(",");
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import authRouter from "./routes/auth.routes.js";
import pollRouter from "./routes/poll.routes.js";
import commentRouter from "./routes/comment.routes.js";
import postRouter from "./routes/post.routes.js";
import likeRouter from "./routes/like.routes.js";

// Routes declaration
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/polls/", pollRouter);
app.use("/api/v1/posts/", postRouter);
app.use("/api/v1/likes/", likeRouter);
app.use("/api/v1/comments/", commentRouter);
app.all("*", (req, res, next) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on the server`));
});

app.use(errorHandler);
export default app;
