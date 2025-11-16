import { ImageFile } from "./ImageFile";

export interface ImageUploader {
  upload(file: ImageFile): Promise<string>;
}
