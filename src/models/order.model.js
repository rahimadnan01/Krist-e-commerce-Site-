import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
    orderStatus: {
      enum: ["Delivered", "Cancelled", "Pending"],
      type: String,
      required: true,
      default: "Pending",
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  {timestamps: true}
);

export const Order = mongoose.model("Order", orderSchema);
