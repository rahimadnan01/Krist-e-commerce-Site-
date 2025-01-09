import {Router} from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  renderingLoginPage,
  renderingSignupPage,
  renderingHomePage,
} from "../controllers/auth.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middelware.js";

const router = Router();

router
  .route("/register")
  .post(
    upload.fields([
      {
        name: "profilePic",
        maxCount: 1,
      },
    ]),
    registerUser
  )
  .get(renderingSignupPage);

router.route("/home").get(renderingHomePage);
router.route("/login").post(loginUser);
router.route("/login").get(renderingLoginPage); //renders login page
// secure routes
router.route("/logout").post(verifyJWT, logoutUser);
export default router;
router.route("/refresh-token").post(refreshAccessToken);
