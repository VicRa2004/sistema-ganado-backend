import { ImageFile } from "./ImageFile";

export interface ImageUploader {
  upload(file: ImageFile): Promise<string>;
  deleteByUrl(url: string): Promise<void>; // elimina usando URL
}
