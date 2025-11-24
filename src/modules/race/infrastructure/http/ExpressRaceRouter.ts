import { Router } from "express";
import { ExpressRaceController } from "./ExpressRaceController";
import { authMiddleware } from "@/core/shared/infrastructure/middlewares/auth.middleware";
import { uploadImage } from "@/core/shared/infrastructure/middlewares/upload.middleware";
import { adminMiddleware } from "@/core/shared/infrastructure/middlewares/admin.middleware";

const controller = new ExpressRaceController();
const ExpressRaceRouter = Router();

ExpressRaceRouter.get("/race", controller.getAll);

ExpressRaceRouter.get("/race/:id", controller.getOne);

ExpressRaceRouter.post(
  "/race",
  authMiddleware,
  adminMiddleware,
  uploadImage,
  controller.create
);

ExpressRaceRouter.put(
  "/race/:id",
  authMiddleware,
  adminMiddleware,
  uploadImage,
  controller.update
);

ExpressRaceRouter.delete(
  "/race/:id",
  authMiddleware,
  adminMiddleware,
  controller.delete
);

export { ExpressRaceRouter };
