import { wrapAsync } from '../utils/wrapAsync.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
const registerUser = wrapAsync(async (req, res, next) => {
  let { email, username, password, profilePic, id } = req.body;
  if (
    [username, email, password, profilePic].some((field) => field?.trim()) ===
    ''
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(409, 'User already exists ');
  }

  let profilePicUrl = req.files?.profilePic[0]?.path;

  if (!profilePicUrl) {
    throw new ApiError(400, 'Profile Picture is required');
  }

  let profilePicture = await uploadOnCloudinary(profilePicUrl);

  if (!profilePicture) {
    throw new ApiError(400, 'Profile picture is required');
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    profilePic: profilePic?.url || '',
  });

  const userCreated = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  if (!userCreated) {
    throw new ApiError(500, 'Something went wrong while saving the user');
  }

  res
    .status(201)
    .json(new ApiResponse(200, 'User created successfully', userCreated));
});

export { registerUser };
