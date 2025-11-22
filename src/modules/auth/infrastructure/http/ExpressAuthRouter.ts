import { Router } from "express";
import { ExpressAuthController } from "./ExpressAuthController";

const ExpressAuthRouter = Router();
const controller = new ExpressAuthController();

ExpressAuthRouter.post("/login", controller.login);
ExpressAuthRouter.post("/register", controller.register);
//ExpressAuthRouter.post("/logout", controller.logout);
//ExpressAuthRouter.post("/refresh-token", controller.refreshToken);

export { ExpressAuthRouter };
