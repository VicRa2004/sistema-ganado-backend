import { Router } from "express";
import { cattleController } from "@controllers/cattle.controller";
import { schemaValidation } from "../middlewares/schemaValidator.middleware";
import { getAllSchema, paramIDSchema } from "../schemas/default.schema";
import { cattleBasicSchema } from "../schemas/cattle.schema";
import { authMiddleware } from "../middlewares/auth.middleware";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get(
  "/cattle",
  authMiddleware,
  schemaValidation(getAllSchema),
  cattleController.getCattles
);

router.get(
  "/cattle/:id",
  authMiddleware,
  schemaValidation(paramIDSchema),
  cattleController.getOneCattle
);

router.post(
  "/cattle",
  authMiddleware,
  upload.single("image"),
  schemaValidation(cattleBasicSchema),
  cattleController.createCattle
);

router.put(
  "/cattle/:id",
  authMiddleware,
  upload.single("image"),
  schemaValidation(cattleBasicSchema),
  cattleController.updateCattle
);

router.delete(
  "/cattle/:id",
  authMiddleware,
  schemaValidation(paramIDSchema),
  cattleController.deleteCattle
);

router.get(
  "/cattle/parent/:id",
  authMiddleware,
  schemaValidation(paramIDSchema),
  schemaValidation(getAllSchema),
  cattleController.getCattlesByParent
);

router.get(
  "/cattle/ground/:id",
  authMiddleware,
  schemaValidation(paramIDSchema),
  schemaValidation(getAllSchema),
  cattleController.getCattlesByGround
);

export default router;
