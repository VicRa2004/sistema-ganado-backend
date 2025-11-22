import { ExpressAuthRouter } from "@/modules/auth/infrastructure/http/ExpressAuthRouter";
import { ExpressGroundRouter } from "@/modules/ground/infrastructure/http/ExpressGroundRouter";
import { Router } from "express";

const ExpressAppRouter = Router();

ExpressAppRouter.use(ExpressAuthRouter);
ExpressAppRouter.use(ExpressGroundRouter);

export { ExpressAppRouter };
