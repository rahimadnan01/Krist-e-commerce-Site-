import {Router} from "express";
const router = Router();
import {
  createCategory,
  showAllProducts,
  updateCategory,
} from "../controllers/category.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
router
  .route("/categories")
  .post(
    upload.fields([
      {
        name: "categoryImage",
        maxCount: 1,
      },
    ]),
    createCategory
  )
  .get(showAllProducts);

router.route("/categories/:id").put(
  upload.fields([
    {
      name: "categoryImage",
      maxCount: 1,
    },
  ]),
  updateCategory
);
export default router;
