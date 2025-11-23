// core/container/services.ts
import { vars } from "@/core/config/env";
import { CloudinaryImageUploader } from "@/modules/images/infrastructure/CloudinaryImageUploader";
import { JWTTokenService } from "@/modules/auth/infrastructure/ports/JWTTokenService";
import { JWTEmailToken } from "@/modules/user/infrastructure/ports/JWTTokenEmail";
import { BcryptPasswordHasher } from "@/modules/user/infrastructure/ports/BcryptPasswordHasher";

export const services = {
  uploader: new CloudinaryImageUploader(
    vars.clCloudName,
    vars.clCloudApiKey,
    vars.clCloudApiSecret
  ),

  tokenService: new JWTTokenService(vars.jwtSecret, vars.jwtExpiresIn),
  emailTokenService: new JWTEmailToken(vars.jwtSecret, "5m"),
  passwordHasher: new BcryptPasswordHasher(),
};
