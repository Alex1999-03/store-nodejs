import { v2 as cloudinary } from "cloudinary";
import { config } from "../config";

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export async function uploadImage(filePath: string) {
  return await cloudinary.uploader.upload(filePath, { folder: "store_nodejs" });
}

export async function deleteImage(id: string) {
  return await cloudinary.uploader.destroy(id);
}
