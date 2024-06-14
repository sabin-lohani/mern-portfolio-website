import mongoose from "mongoose";
import slugify from "../utils/slugify.js";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const optionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const pollSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true },
    question: {
      type: String,
      required: true,
    },
    options: [optionSchema],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

pollSchema.plugin(aggregatePaginate);

pollSchema.pre("validate", function (next) {
  if (this.isNew || this.isModified("question")) {
    this.slug = slugify(this.question);
  }
  next();
});

export default mongoose.model("Poll", pollSchema);
