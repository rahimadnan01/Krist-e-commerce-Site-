import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    paymentMethod: {
      enum: ["Credit Card", "Paypal", "Cash on Delivery", "Google Pay"],
      required: true,
      default: "Credit Card",
    },

  },
  {timestamps: true}
);

export const Payment = mongoose.model("Payment", paymentSchema);
