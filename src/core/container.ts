// repositorios
import { PrismaGroundRepository } from "@/modules/ground/infrastructure/repositories/PrismaGroundRepository";
import { PrismaUserRepository } from "@/modules/user/infrastructure/repositories/PrismaUserRepository";
// servicios
import { CloudinaryImageUploader } from "../modules/images/infrastructure/CloudinaryImageUploader";
import { JWTTokenService } from "@/modules/auth/infrastructure/ports/JWTTokenService";
import { UserGetAll } from "@/modules/user/application/get/UserGetAll";
import { BcryptPasswordHasher } from "@/modules/user/infrastructure/ports/BcryptPasswordHasher";
// use-cases
import { GroundGetAll } from "@/modules/ground/application/get/GroundGetAll";
import { GroundGetOne } from "@/modules/ground/application/get/GroundGetOne";
import { GroundCreate } from "@/modules/ground/application/GroundCreate";
import { GroundUpdate } from "@/modules/ground/application/GroundUpdate";
import { GroundDelete } from "@/modules/ground/application/GroundDelete";
import { UserGetOne } from "@/modules/user/application/get/UserGetOne";
import { UserCreate } from "@/modules/user/application/UserCreate";
import { UserUpdate } from "@/modules/user/application/UserUpdate";
import { UserDelete } from "@/modules/user/application/UserDelete";
import { AuthLogin } from "@/modules/auth/application/AuthLogin";

const uploader = new CloudinaryImageUploader(
  process.env.CLOUDINARY_CLOUD_NAME!,
  process.env.CLOUDINARY_API_KEY!,
  process.env.CLOUDINARY_API_SECRET!
);

// servicios
const tokenService = new JWTTokenService("secret-1", "7d");
const passwordHasher = new BcryptPasswordHasher();

// Repositorios
const groundRepo = new PrismaGroundRepository();
const userRepo = new PrismaUserRepository();

// use-cases de ground
const groundGetAll = new GroundGetAll(groundRepo);
const groundGetOne = new GroundGetOne(groundRepo);
const groundCreate = new GroundCreate(groundRepo);
const groundUpdate = new GroundUpdate(groundRepo);
const groundDelete = new GroundDelete(groundRepo);

// use-case de user
const userGetAll = new UserGetAll(userRepo);
const userGetOne = new UserGetOne(userRepo);
const userCreate = new UserCreate(userRepo, passwordHasher);
const userUpdate = new UserUpdate(userRepo);
const userDelete = new UserDelete(userRepo);

// use-case  de auth
const authLogin = new AuthLogin(userRepo, tokenService, passwordHasher);

// container
export const container = {
  image: uploader,
  tokenService,
  auth: {
    login: authLogin.run,
  },
  ground: {
    getAll: groundGetAll.run,
    getOne: groundGetOne.run,
    create: groundCreate.run,
    update: groundUpdate.run,
    delete: groundDelete.run,
  },
  user: {
    getAll: userGetAll.run,
    getOne: userGetOne.run,
    create: userCreate.run,
    update: userUpdate.run,
    delete: userDelete.run,
  },
};
