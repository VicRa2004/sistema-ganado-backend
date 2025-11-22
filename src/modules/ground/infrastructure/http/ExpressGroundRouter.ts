import { Router } from "express";
import { GroundController } from "./ExpressGroundController";
import { authMiddleware } from "@/core/shared/infrastructure/middlewares/auth.middleware";

const controller = new GroundController();

const ExpressGroundRouter = Router();

ExpressGroundRouter.get("/ground", authMiddleware, controller.getAll);

export { ExpressGroundRouter };
