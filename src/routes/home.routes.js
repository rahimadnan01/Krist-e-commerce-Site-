import {Router} from "express";
import {renderingHomePage} from "../controllers/pages.controller.js";
import {Product} from "../models/product.model.js";
import {app} from "../app.js";
import {errorHandler} from "../middlewares/error.middelware.js";
const router = Router();
router.route("/home").get(renderingHomePage);

export default router;
