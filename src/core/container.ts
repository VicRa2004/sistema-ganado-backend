import { GroundCreate } from "@/modules/ground/application/GroundCreate";
import { CloudinaryImageUploader } from "../modules/images/infrastructure/CloudinaryImageUploader";
import { PrismaGroundRepository } from "@/modules/ground/infrastructure/repositories/PrismaGroundRepository";
import { GroundGetAll } from "@/modules/ground/application/get/GroundGetAll";
import { GroundGetOne } from "@/modules/ground/application/get/GroundGetOne";
import { GroundUpdate } from "@/modules/ground/application/GroundUpdate";
import { GroundDelete } from "@/modules/ground/application/GroundDelete";
import { JWTTokenService } from "@/modules/auth/infrastructure/ports/JWTTokenService";

const uploader = new CloudinaryImageUploader(
  process.env.CLOUDINARY_CLOUD_NAME!,
  process.env.CLOUDINARY_API_KEY!,
  process.env.CLOUDINARY_API_SECRET!
);

const tokenService = new JWTTokenService("secret-1", "7d");

// Repositorios
const groundRepo = new PrismaGroundRepository();

// use-cases de ground
const groundGetAll = new GroundGetAll(groundRepo);
const groundGetOne = new GroundGetOne(groundRepo);
const groundCreate = new GroundCreate(groundRepo);
const groundUpdate = new GroundUpdate(groundRepo);
const groundDelete = new GroundDelete(groundRepo);

// container
export const container = {
  image: uploader,
  tokenService,
  ground: {
    getAll: groundGetAll.run,
    getOne: groundGetOne.run,
    create: groundCreate.run,
    update: groundUpdate.run,
    delete: groundDelete.run,
  },
};
