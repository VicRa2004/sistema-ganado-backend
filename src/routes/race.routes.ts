import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidator.middleware";
import { getAllSchema, paramIDSchema } from "../schemas/default.schema";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getAllRace, getOneRace } from "../controllers/race.controller";
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

export default router;
