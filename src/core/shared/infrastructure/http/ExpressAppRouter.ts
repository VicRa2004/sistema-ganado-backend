import { ExpressAuthRouter } from "@/modules/auth/infrastructure/http/ExpressAuthRouter";
import { ExpressCattleRouter } from "@/modules/cattle/infrastructure/http/ExpressCattleRouter";
import { ExpressGroundRouter } from "@/modules/ground/infrastructure/http/ExpressGroundRouter";
import { ExpressIronRouter } from "@/modules/iron/infrastructure/http/ExpressIronRouter";
import { Router } from "express";

const ExpressAppRouter = Router();

ExpressAppRouter.use(ExpressAuthRouter);
ExpressAppRouter.use(ExpressGroundRouter);
ExpressAppRouter.use(ExpressIronRouter);
ExpressAppRouter.use(ExpressCattleRouter);

export { ExpressAppRouter };
