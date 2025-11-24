import { Router } from "express";
import { ExpressCattleController } from "./ExpressCattleController";
import { authMiddleware } from "@/core/shared/infrastructure/middlewares/auth.middleware";
import { uploadImage } from "@/core/shared/infrastructure/middlewares/upload.middleware";

const controller = new ExpressCattleController();
const ExpressCattleRouter = Router();

ExpressCattleRouter.get("/cattle", authMiddleware, controller.getAll);

ExpressCattleRouter.get("/cattle/:id", authMiddleware, controller.getOne);

ExpressCattleRouter.post(
  "/cattle/",
  authMiddleware,
  uploadImage,
  controller.create
);

ExpressCattleRouter.put(
  "/cattle/:id",
  authMiddleware,
  uploadImage,
  controller.update
);

ExpressCattleRouter.delete("/cattle/:id", authMiddleware, controller.delete);

export { ExpressCattleRouter };
