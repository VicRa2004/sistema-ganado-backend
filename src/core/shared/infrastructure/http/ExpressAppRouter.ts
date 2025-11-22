import { ExpressGroundRouter } from "@/modules/ground/infrastructure/http/ExpressGroundRouter";
import { Router } from "express";

const ExpressAppRouter = Router();

ExpressAppRouter.use(ExpressGroundRouter);

export { ExpressAppRouter };
