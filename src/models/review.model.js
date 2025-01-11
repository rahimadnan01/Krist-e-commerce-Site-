import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    rating: {
      type: Number,
      max: 5,
      default: 0,
    },
    comment: {
      type: String,
      required:true
    },
  },
  {timestamps: true}
);

export const Review = mongoose.model("Review", reviewSchema);
