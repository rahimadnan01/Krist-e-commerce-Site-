import {wrapAsync} from "../utils/wrapAsync.js";
import {ApiError} from "../utils/ApiError.js";
import {Category} from "../models/category.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
const createCategory = wrapAsync(async (req, res) => {
  let {name, categoryImage} = req.body;

  if ([name, categoryImage].some((field) => field?.trim()) == "") {
    throw new ApiError(400, "Enter all Fields");
  }

  const existedCategory = await Category.findOne({name});
  if (existedCategory) {
    throw new ApiError(400, "Category already exists");
  }

  const categoryImagePath = req.files?.categoryImage[0].path;
  if (!categoryImagePath) {
    throw new ApiError(400, "category Image Path is required");
  }

  const categoryImageUrl = await uploadOnCloudinary(categoryImagePath);

  let category = await Category.create({
    name: name,
    categoryImage: categoryImageUrl.url,
  });

  if (!category) {
    throw new ApiError(500, "Failed to create new Category");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, category, "Category has been created successfully")
    );
});
const showAllProducts = wrapAsync(async (req, res) => {
  let categories = await Category.find();
  if (!categories) {
    throw new ApiError(500, "Failed to fetch categories");
  }

  res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories shown successfully"));
});
const updateCategory = wrapAsync(async (req, res) => {
  let {name, categoryImage} = req.body;
  let id = req.params.id;

  let updatedFields = {
    name,
    categoryImage,
  };

  let categoryImageUrl = null;
  if (req.files?.categoryImage) {
    const categoryImagePath = req.files?.categoryImage[0].path;
    categoryImageUrl = await uploadOnCloudinary(categoryImagePath);
  }

  let updatedData = {
    name,
  };

  if (categoryImageUrl) {
    updatedData.categoryImage = categoryImageUrl.url;
  }
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      $set: updatedData,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  console.log(updatedCategory);
  if (!updatedCategory) {
    throw new ApiError(500, "Failed to update Category");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, "Category updated successfully")
    );
});

export {createCategory, showAllProducts, updateCategory};
