import {Router} from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
} from "../controllers/auth.controller.js";

import {verifyJWT} from "../middlewares/auth.middelware.js";
import {
  renderingLoginPage,
  renderingSignupPage,
} from "../controllers/pages.controller.js";

const router = Router();

router.route("/register").post(registerUser).get(renderingSignupPage);

router.route("/login").post(loginUser);
router.route("/login").get(renderingLoginPage); //renders login page

// secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
export default router;
