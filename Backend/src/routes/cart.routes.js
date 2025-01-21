import {Router} from "express";
import {createCart, showCart} from "../controllers/cart.controller.js";
import {verifyJWT} from "../middlewares/auth.middelware.js";
const router = Router();

router.route("/cart").post(verifyJWT, createCart).get(verifyJWT, showCart);

export default router;
