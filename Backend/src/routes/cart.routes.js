import {Router} from "express";
import {
  createCart,
  showCart,
  removeCart,
} from "../controllers/cart.controller.js";
import {verifyJWT} from "../middlewares/auth.middelware.js";
const router = Router();

router.route("/cart").post(verifyJWT, createCart).get(verifyJWT, showCart);
router.route("/remove-cart/:productId").delete(verifyJWT, removeCart);
export default router;
