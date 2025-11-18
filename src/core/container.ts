import { CloudinaryImageUploader } from "../modules/images/infrastructure/CloudinaryImageUploader";

const uploader = new CloudinaryImageUploader(
  process.env.CLOUDINARY_CLOUD_NAME!,
  process.env.CLOUDINARY_API_KEY!,
  process.env.CLOUDINARY_API_SECRET!
);

export const container = {
  image: uploader,
};
