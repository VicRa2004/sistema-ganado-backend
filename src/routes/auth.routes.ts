import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import {
   loginSchema,
   registerSchema,
   getVerifySchema,
   sendEmailSchema,
} from "../schemas/auth.schema";
import { schemaValidation } from "../middlewares/schemaValidator.middleware";

const routes = Router();

routes.post("/login", schemaValidation(loginSchema), authController.login);

routes.post(
   "/register",
   schemaValidation(registerSchema),
   authController.register
);

routes.post(
   "/send-email",
   schemaValidation(sendEmailSchema),
   authController.sendVerifyEmail
);

routes.post(
   "/verify-email/:token",
   schemaValidation(getVerifySchema),
   authController.verifyEmail
);

export default routes;
