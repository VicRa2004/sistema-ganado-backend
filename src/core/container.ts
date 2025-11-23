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
// vaiables de entorno
import { vars } from "./config/env";
import { AuthRegister } from "@/modules/auth/application/AuthRegister";
import { UserActivateAccount } from "@/modules/user/application/UserActivateAccount";
import { JWTEmailToken } from "@/modules/user/infrastructure/ports/JWTTokenEmail";
import { UserGenerateToken } from "@/modules/user/application/UserGenerateToken";
import { sendEmailUseCase } from "@/modules/email/infrastructure";
import { IronGetAll } from "@/modules/iron/application/get/IronGetAll";
import { PrismaIronRepository } from "@/modules/iron/infrastructure/repositories/PrismaIronRepository";
import { IronGetOne } from "@/modules/iron/application/get/IronGetOne";
import { IronCreate } from "@/modules/iron/application/IronCreate";
import { IronUpdate } from "@/modules/iron/application/IronUpdate";
import { IronDelete } from "@/modules/iron/application/IronDelete";

const uploader = new CloudinaryImageUploader(
  vars.clCloudName,
  vars.clCloudApiKey,
  vars.clCloudApiSecret
);

// servicios
const tokenService = new JWTTokenService("secret-1", "7d");
const tokenEmail = new JWTEmailToken("secret-1", "5m");
const passwordHasher = new BcryptPasswordHasher();

// Repositorios
const groundRepo = new PrismaGroundRepository();
const ironRepo = new PrismaIronRepository();
const userRepo = new PrismaUserRepository();

// use-cases de ground
const groundGetAll = new GroundGetAll(groundRepo);
const groundGetOne = new GroundGetOne(groundRepo);
const groundCreate = new GroundCreate(groundRepo);
const groundUpdate = new GroundUpdate(groundRepo);
const groundDelete = new GroundDelete(groundRepo, uploader);

const ironGetAll = new IronGetAll(ironRepo);
const ironGetOne = new IronGetOne(ironRepo);
const ironCreate = new IronCreate(ironRepo);
const ironUpdate = new IronUpdate(ironRepo);
const ironDelete = new IronDelete(ironRepo, uploader);

// use-case de user
const userGetAll = new UserGetAll(userRepo);
const userGetOne = new UserGetOne(userRepo);
const userCreate = new UserCreate(userRepo, passwordHasher);
const userUpdate = new UserUpdate(userRepo);
const userDelete = new UserDelete(userRepo);
const userActivateAccount = new UserActivateAccount(userRepo, tokenEmail);
const userGenerateToken = new UserGenerateToken(tokenEmail);

// use-case  de auth
const authLogin = new AuthLogin(userRepo, tokenService, passwordHasher);
const authRegister = new AuthRegister(userRepo, passwordHasher);

// container
export const container = {
  image: uploader,
  tokenService,
  auth: {
    login: authLogin,
    register: authRegister,
  },
  ground: {
    getAll: groundGetAll,
    getOne: groundGetOne,
    create: groundCreate,
    update: groundUpdate,
    delete: groundDelete,
  },
  iron: {
    getAll: ironGetAll,
    getOne: ironGetOne,
    create: ironCreate,
    update: ironUpdate,
    delete: ironDelete,
  },
  user: {
    getAll: userGetAll,
    getOne: userGetOne,
    create: userCreate,
    update: userUpdate,
    delete: userDelete,
    activate: userActivateAccount,
    generateToken: userGenerateToken,
  },
  email: {
    send: sendEmailUseCase,
  },
};
