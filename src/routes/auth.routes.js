import {Router} from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  renderingLoginPage,
} from "../controllers/auth.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middelware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "profilePic",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/login").get(renderingLoginPage);//renders login page
// secure routes
router.route("/logout").post(verifyJWT, logoutUser);
export default router;
router.route("/refresh-token").post(refreshAccessToken);
