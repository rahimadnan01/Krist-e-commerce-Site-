import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    houseNumber: {
      type: String,
      required: true,
    },
    Area: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

export const Address = mongoose.model("Address", addressSchema);
