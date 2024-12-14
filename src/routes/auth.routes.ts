import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { schemaValidation } from "../middlewares/schemaValidator.middleware";

const routes = Router();

routes.post("/login", schemaValidation(loginSchema), login);

routes.post("/register", schemaValidation(registerSchema), register);

export default routes;
