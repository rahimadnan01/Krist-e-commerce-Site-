import {Product} from "../models/product.model.js";
import {ApiError} from "../utils/ApiError.js";
import {wrapAsync} from "../utils/wrapAsync.js";
const renderingHomePage = wrapAsync(async (req, res) => {
  let products = await Product.find().limit(10);
  if (!products) {
    throw new ApiError(500, "Failed to fetch products");
  }
  res.render("../views/pages/home.ejs", {products});
});

export {renderingHomePage};
