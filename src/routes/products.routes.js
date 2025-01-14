import {Router} from "express";
import {upload} from "../middlewares/multer.middleware.js";
import {
  creatingProducts,
  deleteProduct,
  showAllProducts,
  showProduct,
  updatingProduct,
} from "../controllers/products.controller.js";

const router = Router();
router
  .route("/products")
  .post(
    upload.fields([
      {
        name: "productPic",
        maxCount: 2,
      },
    ]),
    creatingProducts
  )
  .get(showAllProducts);
router
  .route("/products/:id")
  .get(showProduct)
  .put(
    upload.fields([
      {
        name: "productPic",
        maxCount: 2,
      },
    ]),
    updatingProduct
  )
  .delete(deleteProduct);

export default router;
