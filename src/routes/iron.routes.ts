import { ironController } from "../controllers/iron.controller";
import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidator.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getAllSchema, paramIDSchema } from "../schemas/default.schema";
import { ironBasicSchema } from "../schemas/iron.schema";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get(
  "/iron",
  authMiddleware,
  schemaValidation(getAllSchema),
  ironController.getAllIrons
);

router.get(
  "/iron/:id",
  authMiddleware,
  schemaValidation(paramIDSchema),
  ironController.getOneIron
);

router.post(
  "/iron",
  authMiddleware,
  upload.single("image"),
  schemaValidation(ironBasicSchema),
  ironController.createIron
);

router.put(
  "/iron/:id",
  authMiddleware,
  upload.single("image"),
  schemaValidation(paramIDSchema),
  ironController.updateIron
);

router.delete(
  "/iron/:id",
  authMiddleware,
  upload.single("image"),
  schemaValidation(paramIDSchema),
  ironController.deleteIron
);

export default router;
