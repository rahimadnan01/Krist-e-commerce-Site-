import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    addresses: [
      {
        name: {
          type: String,
          required: true,
          lowercase: true,
        },
        mobileNum: {
          type: String,
          required: true,
        },
        residence: {
          type: String,
          required: true,
        },
        area: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        pinCode: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist',
      },
    ],
    cart: [
      {
        products: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
    profilePic: {
      type: String, //cloudinary url
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getAccessToken = function () {
  return jwt.sign(
    {
      username: this.username,
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.getRefreshToken = function () {
  return jwt.sign(
    {
      username: this.username,
      _id: this._id,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model('User', userSchema);

export { User };
