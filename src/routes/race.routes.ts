import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidator.middleware";
import { getAllSchema, paramIDSchema } from "../schemas/default.schema";
import { raceBasicSchema } from "../schemas/race.schema";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getAllRace,
  getOneRace,
  createRace,
  updateRace,
  deleteRace,
} from "../controllers/race.controller";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get("/race", authMiddleware, schemaValidation(getAllSchema), getAllRace);

router.get(
  "/race/:id",
  authMiddleware,
  schemaValidation(paramIDSchema),
  getOneRace
);

router.post(
  "/race",
  authMiddleware,
  upload.single("image"),
  schemaValidation(raceBasicSchema),
  createRace
);

router.put(
  "/race/:id",
  authMiddleware,
  upload.single("image"),
  schemaValidation(raceBasicSchema),
  updateRace
);

router.delete(
  "/race/:id",
  authMiddleware,
  schemaValidation(paramIDSchema),
  deleteRace
);

export default router;
