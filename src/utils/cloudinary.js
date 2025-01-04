import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET_API,
});

// function to upload files on cloudinary

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    let response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    // FILE HAS uploaded
    fs.unlinkSync(localFilePath);
    return response;
  } catch (err) {
    // when flies fail to upload
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
