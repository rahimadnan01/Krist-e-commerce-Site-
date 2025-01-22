import mongoose from "mongoose";
import {wrapAsync} from "../utils/wrapAsync.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {Cart} from "../models/cart.model.js";
import {Product} from "../models/product.model.js";

const createCart = wrapAsync(async (req, res) => {
  let userId = req.user._id;
  let {products, totalPrice} = req.body;

  if (userId == "" || totalPrice == "") {
    throw new ApiError(400, "user id and products are required");
  }

  let cart = await Cart.create({
    userId: userId,
    products: products,
    totalPrice: totalPrice,
  });

  if (!cart) {
    throw new ApiError(500, "something went wrong while creating a cart");
  }

  res.status(200).json(new ApiResponse(200, cart, "Cart created successfully"));
});

const showCart = wrapAsync(async (req, res) => {
  let userId = req.user._id;
  let cart = await Cart.findOne({userId});
  if (!cart) {
    throw new ApiError(500, "User has no products in cart ");
  }
  res.status(200).json(new ApiResponse(200, cart, "Cart shown successfully"));
});

const removeCart = wrapAsync(async (req, res) => {
  let userId = req.user._id;
  let productId = new mongoose.Types.ObjectId(req.params.productId);
  console.log(userId, productId);
  if (!productId) {
    throw new ApiError(500, "failed to fetch correct product Id");
  }
  let result = await Cart.updateOne(
    {userId},
    {
      $pull: {
        products: {_id: productId},
      },
    },
    {
      new: true,
    }
  );

  if (result.modifiedCount > 0) {
    res
      .status(200)
      .json(
        new ApiResponse(200, "product deleted from Cart successfully", result)
      );
  } else {
    throw new ApiError(500, "failed to delete product from cart");
  }
});

export {createCart, showCart, removeCart};
