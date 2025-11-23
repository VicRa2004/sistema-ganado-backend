import { Router } from "express";
import { GroundController } from "./ExpressGroundController";
import { authMiddleware } from "@/core/shared/infrastructure/middlewares/auth.middleware";
import { uploadImage } from "@/core/shared/infrastructure/middlewares/upload.middleware";

const controller = new GroundController();

const ExpressGroundRouter = Router();

ExpressGroundRouter.get("/ground", authMiddleware, controller.getAll);

ExpressGroundRouter.get("/ground/:id", authMiddleware, controller.getOne);

ExpressGroundRouter.post(
  "/ground",
  authMiddleware,
  uploadImage,
  controller.create
);

ExpressGroundRouter.put(
  "/ground/:id",
  authMiddleware,
  uploadImage,
  controller.update
);

ExpressGroundRouter.get("/ground/:id", authMiddleware, controller.delete);

export { ExpressGroundRouter };
