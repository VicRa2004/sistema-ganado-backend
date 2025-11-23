import cloudinary from "cloudinary";
import { ImageUploader } from "../domain/ImageUploader";
import { ImageFile } from "../domain/ImageFile";

export class CloudinaryImageUploader implements ImageUploader {
  constructor(
    private readonly cloudName: string,
    private readonly apiKey: string,
    private readonly apiSecret: string,
    private readonly folder: string = "uploads"
  ) {
    cloudinary.v2.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

  private extractPublicIdFromUrl(url: string): string {
    const parts = url.split("/");
    const filename = parts[parts.length - 1]; // abc123.jpg
    const folder = parts[parts.length - 2]; // uploads
    const publicId = `${folder}/${filename.replace(/\.[^.]+$/, "")}`;
    return publicId;
  }

  async upload(file: ImageFile): Promise<string> {
    if (!file) {
      throw new Error("No se proporcionó ningún archivo para subir.");
    }

    return new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        { folder: this.folder },
        (error, result) => {
          if (error) return reject(error);
          resolve(result!.secure_url);
        }
      );

      stream.end(file.buffer);
    });
  }

  deleteByUrl(url: string): Promise<void> {
    const publicId = this.extractPublicIdFromUrl(url);

    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.destroy(publicId, (err, result) => {
        if (err) return reject(err);

        if (result?.result !== "ok" && result?.result !== "not found") {
          return reject(new Error("Error al borrar imagen"));
        }

        resolve();
      });
    });
  }
}
