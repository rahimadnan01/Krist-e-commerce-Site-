import {Router} from "express";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
const router = Router();

router.route("/users").post(createUser);
router.route("/users/:id").delete(deleteUser);
router.route("/users/:id").put(updateUser);
export default router;
