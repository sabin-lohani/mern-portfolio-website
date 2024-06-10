import mongoose from "mongoose";

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
    question: {
      type: String,
      required: true,
    },
    options: [optionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Poll", pollSchema);
