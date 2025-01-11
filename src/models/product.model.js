import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slogan: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    price: {
      type: String,
      required: true,
      default: "1",
    },
    color: {
      type: String,
      default: "black",
    },
    size: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["InStock", "SoldOut"],
      required: true,
    },
    productPic: {
      type: [String], //cloudinary url
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);
const Product = mongoose.model("Product", productSchema);

export {Product};
