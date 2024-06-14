import mongoose from "mongoose";
import slugify from "../utils/slugify.js";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

postSchema.plugin(aggregatePaginate);

postSchema.pre("validate", function (next) {
  if (this.isNew || this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  next();
});

export default mongoose.model("Post", postSchema);
