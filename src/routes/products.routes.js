import {Router} from "express";
import {upload} from "../middlewares/multer.middleware.js";
import {creatingProducts} from "../controllers/products.controller.js";

const router = Router();
router.route("/products").post(
  upload.fields([
    {
      name: "productPic",
      maxCount: 1,
    },
  ]),
  creatingProducts
);

export default router;
