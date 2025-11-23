import { Router } from "express";
import { ExpressIronController } from "./ExpressIronController";
import { authMiddleware } from "@/core/shared/infrastructure/middlewares/auth.middleware";
import { uploadImage } from "@/core/shared/infrastructure/middlewares/upload.middleware";

const controller = new ExpressIronController();

const ExpressIronRouter = Router();

ExpressIronRouter.get("/iron", authMiddleware, controller.getAll);
ExpressIronRouter.get("/iron/:id", authMiddleware, controller.getOne);
ExpressIronRouter.post("/iron", authMiddleware, uploadImage, controller.create);
ExpressIronRouter.put(
  "/iron/:id",
  authMiddleware,
  uploadImage,
  controller.update
);
ExpressIronRouter.delete("/iron", authMiddleware, controller.delete);

export { ExpressIronRouter };
