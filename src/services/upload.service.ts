import cloudinary from "cloudinary";

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

// Configuración de Cloudinary
cloudinary.v2.config({
   cloud_name,
   api_key,
   api_secret,
});

export const uploadImage = async (file: Express.Multer.File) => {
   if (!file) {
      throw new Error("No se proporcionó ningún archivo para subir.");
   }

   try {
      const result = await new Promise((resolve, reject) => {
         const upload = cloudinary.v2.uploader.upload_stream(
            { folder: "uploads" }, // Configuración opcional
            (error, result) => {
               if (error) return reject(error); // Manejo de error
               resolve(result); // Resuelve con el resultado
            }
         );
         upload.end(file.buffer); // Envía el buffer al stream
      });

      return (result as cloudinary.UploadApiResponse).secure_url; // Devuelve la URL segura
   } catch (error) {
      console.error("Error subiendo la imagen a Cloudinary:", error);
      throw new Error("No se pudo subir la imagen.");
   }
};
