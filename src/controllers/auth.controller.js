import {wrapAsync} from "../utils/wrapAsync.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.getAccessToken();
    const refreshToken = user.getRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});
    return {accessToken, refreshToken};
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating an access and refresh token"
    );
  }
};

const registerUser = wrapAsync(async (req, res, next) => {
  let {email, username, password} = req.body;
  if ([username, email, password].some((field) => field?.trim()) === "") {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({$or: [{username}, {email}]});

  if (existedUser) {
    throw new ApiError(409, "User already exists ");
  }

  let profilePicUrl = req.files?.profilePic[0]?.path;

  if (!profilePicUrl) {
    throw new ApiError(400, "Profile Picture is required");
  }

  let profilePicture = await uploadOnCloudinary(profilePicUrl);

  if (!profilePicture) {
    throw new ApiError(400, "Profile picture is required");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    profilePic: profilePicture.url,
  });

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  console.log(req.files);
  if (!userCreated) {
    throw new ApiError(500, "Something went wrong while saving the user");
  }

  res
    .status(201)

    .json(
      new ApiResponse(200, "User created successfully", {
        userCreated,
        redirectUrl: "/api/v1/users/login",
      })
    );
});

const loginUser = wrapAsync(async (req, res) => {
  let {email, password} = req.body;

  if (!password || !email) {
    throw new ApiError(400, "Password and email is required");
  }

  let user = await User.findOne({email});

  if (!user) {
    throw new ApiError(400, "User not Found");
  }

  let passwordResult = await user.isPasswordCorrect(password);
  if (!passwordResult) {
    throw new ApiError(400, "invalid Credentials");
  }
  console.log(user);
  let {accessToken, refreshToken} = await generateAccessAndRefreshToken(
    user._id
  );

  let loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  let options = {
    httpOnly: true,
    secure: true,
  };
  let redirectUrl = "http://localhost:3000/api/v1/users/home";
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, {
        user: loggedInUser,
        redirectUrl,
        accessToken,
        refreshToken,
      })
    );
});

const logoutUser = wrapAsync(async (req, res) => {
  let options = {
    httpOnly: true,
    secure: true,
  };
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user Logout successfully"));
});

const refreshAccessToken = wrapAsync(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (!decodedToken) {
    throw new ApiError(401, "Unauthorized User");
  }

  const user = await User.findById(decodedToken._id);
  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "User is Unauthorized");
  }

  const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, option)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken: newRefreshToken,
        },
        "accessToken refreshed"
      )
    );
});

// for rendering Pages
const renderingLoginPage = (req, res) => {
  res.render("../views/pages/login.ejs");
};
const renderingSignupPage = (req, res) => {
  res.render("../views/pages/signup.ejs");
};
const renderingHomePage = (req, res) => {
  res.render("../views/pages/home.ejs");
};

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  renderingLoginPage,
  renderingSignupPage,
  renderingHomePage,
};
