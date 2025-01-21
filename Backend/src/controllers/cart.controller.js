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
  let cart = await Cart.findOne({userId}).populate("products");
  if (!cart) {
    throw new ApiError(500, "Something went wrong while fetching the cart ");
  }
  res.status(200).json(new ApiResponse(200, cart, "Cart shown successfully"));
});

export {createCart, showCart};
