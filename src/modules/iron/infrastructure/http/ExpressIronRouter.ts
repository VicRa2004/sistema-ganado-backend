import { Router } from "express";
import { ExpressIronController } from "./ExpressIronController";
import { authMiddleware } from "@/core/shared/infrastructure/middlewares/auth.middleware";

const controller = new ExpressIronController();

const ExpressIronRouter = Router();

ExpressIronRouter.get("/iron", authMiddleware, controller.getAll);

export { ExpressIronRouter };
