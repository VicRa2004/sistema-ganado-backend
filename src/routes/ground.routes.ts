import { Router } from "express";
import {
  getGrounds,
  getOneGround,
  createGround,
  updateGround,
  deleteGround,
} from "../controllers/ground.controller";
import { schemaValidation } from "../middlewares/schemaValidator.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { groundBasicSchema } from "../schemas/ground.schema";
import { getAllSchema, paramIDSchema } from "../schemas/default.schema";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get(
  "/ground",
  authMiddleware,
  schemaValidation(getAllSchema),
  getGrounds
);

router.get(
  "/ground/:id",
  authMiddleware,
  schemaValidation(paramIDSchema),
  getOneGround
);

router.post(
  "/ground",
  authMiddleware,
  upload.single("image"),
  schemaValidation(groundBasicSchema),
  createGround
);

router.put(
  "/ground/:id",
  authMiddleware,
  upload.single("image"),
  schemaValidation(groundBasicSchema),
  schemaValidation(paramIDSchema),
  updateGround
);

router.delete(
  "/ground/:id",
  authMiddleware,
  upload.single("image"),
  schemaValidation(paramIDSchema),
  deleteGround
);

export default router;
