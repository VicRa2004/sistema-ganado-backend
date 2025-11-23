import { Router } from "express";
import { ExpressAuthController } from "./ExpressAuthController";

const ExpressAuthRouter = Router();
const controller = new ExpressAuthController();

ExpressAuthRouter.post("/login", controller.login);
ExpressAuthRouter.post("/register", controller.register);
ExpressAuthRouter.post("/send-email/:id", controller.sendEmail);
ExpressAuthRouter.post("/activate/:token", controller.activate);
//ExpressAuthRouter.post("/logout", controller.logout);
//ExpressAuthRouter.post("/refresh-token", controller.refreshToken);

export { ExpressAuthRouter };
