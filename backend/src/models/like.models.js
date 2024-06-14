import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    item_type: {
      type: String,
      enum: ["poll", "post", "comment"],
      required: true,
    },
  },
  { timestamps: true }
);

likeSchema.index({ item_id: 1, item_type: 1 }, { unique: true });

export default mongoose.model("Like", likeSchema);
