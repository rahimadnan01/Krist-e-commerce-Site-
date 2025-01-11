import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {wrapAsync} from "../utils/wrapAsync.js";

const createUser = wrapAsync(async (req, res) => {
  //get all fields
  // write condition
  // check if user existed or not
  // if not create user
  // save the user
  //   remove password and refresh token from user
  let {username, email, password, role} = req.body;

  if ([username, email, password, role]?.some((field) => field.trim()) == "") {
    throw new ApiError(400, "All fields are required to create new User");
  }

  const existedUser = await User.findOne({email});
  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    username: username,
    email: email,
    password: password,
    role: role,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating User");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created Successfully"));
});
const deleteUser = wrapAsync(async (req, res) => {
  let id = req.params.id;
  let deletedUser = await User.findOneAndDelete({_id: id});
  if (!deletedUser) {
    throw new ApiError(404, "User not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, deletedUser, "User has deleted successfully"));
});
const updateUser = wrapAsync(async (req, res) => {
  let {email, password, username, role} = req.body;
  let id = req.params.id;
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        email: email,
        password: password,
        username: username,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -refreshToken");

  if (!updatedUser) {
    throw new ApiError(500, "SOmething went wrong while updating the User");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});
export {createUser, deleteUser, updateUser};
