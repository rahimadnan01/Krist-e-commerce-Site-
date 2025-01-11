import {Product} from "../models/product.model.js";
import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {wrapAsync} from "../utils/wrapAsync.js";
const creatingProducts = wrapAsync(async (req, res) => {
  //get all data
  //check no data is empty
  //upload image
  //get image path and url
  //save the product in the Product collection
  let {
    title,
    slogan,
    description,
    reviews,
    price,
    color,
    size,
    status,
    productPic,
    category,
  } = req.body;

  if (
    [
      title,
      slogan,
      description,
      price,
      color,
      size,
      status,
      productPic,
      category,
    ]?.some((field) => field?.trim()) === ""
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const productPicPath = req.files?.productPic[0].path;
  if (!productPicPath) {
    throw new ApiError(400, "Product Pic path is required");
  }

  const productPathUrl = await uploadOnCloudinary(productPicPath);

  if (!productPathUrl) {
    throw new ApiError(400, "profile Pic is necessary");
  }

  const product = await Product.create({
    title: title,
    slogan: slogan,
    description: description,
    reviews: reviews,
    price: price,
    color: color,
    size: size,
    status: status,
    productPic: productPathUrl.url,
    category: category,
  });

  const createdProduct = await Product.findById(product._id);
  if (!createdProduct)
    throw new ApiError(500, "Something went wrong while creating new Product");

  res
    .status(200)
    .json(new ApiResponse(200, createdProduct, "Product created successfully"));
});

export {creatingProducts};
