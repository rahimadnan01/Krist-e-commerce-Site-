import {Product} from "../models/product.model.js";
import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {wrapAsync} from "../utils/wrapAsync.js";

const creatingProducts = wrapAsync(async (req, res) => {
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

const showProduct = wrapAsync(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(400, "Bad request");
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product showed successfully"));
});

const showAllProducts = wrapAsync(async (req, res) => {
  let allProducts = await Product.find();
  if (!allProducts) {
    throw new ApiError(500, "Failed to fetch Products");
  }
  res
    .status(200)
    .json(new ApiResponse(200, allProducts, "Products shown successfully"));
});

const updatingProduct = wrapAsync(async (req, res) => {
  let id = req.params.id;

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

  const updateFields = {
    title,
    slogan,
    description,
    price,
    color,
    size,
    status,
    productPic,
    category,
  };

  if (!id) {
    throw new ApiError(400, "Please provide id to update the product");
  }

  let productPicUrl = null;
  if (req.files?.productPic) {
    const productPicPath = req.files.productPic[0]?.path;
    productPicUrl = await uploadOnCloudinary(productPicPath);
  }
  const updateData = {
    title,
    slogan,
    description,
    price,
    color,
    size,
    status,
    category,
  };
  if (productPicUrl) {
    updateData.productPic = productPicUrl.url;
  }
  let updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedProduct) {
    throw new ApiError(500, "Failed to fetch products");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

const deleteProduct = wrapAsync(async (req, res) => {
  let id = req.params.id;
  let deletedProduct = await Product.findByIdAndDelete(id);
  if (!deleteProduct) {
    throw new ApiError(500, "Failed to delete product");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        deletedProduct,
        "Product has been deleted successfully"
      )
    );
});
export {
  creatingProducts,
  showProduct,
  showAllProducts,
  updatingProduct,
  deleteProduct,
};
