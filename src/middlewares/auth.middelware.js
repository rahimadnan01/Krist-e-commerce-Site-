import jwt from "jsonwebtoken";
import {wrapAsync} from "../utils/wrapAsync.js";
import cookieParser from "cookie-parser";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
export const verifyJWT = wrapAsync(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      throw new ApiError(400, "Unauthorized user");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken) {
      throw new ApiError(500, "Something went wrong while accessing token");
    }

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new Error(500, "something went wrong while finding a user");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});
