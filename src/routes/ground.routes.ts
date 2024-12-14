import { Router } from "express";
import { getGrounds, createGround } from "../controllers/ground.controller";
import { schemaValidation } from "../middlewares/schemaValidator.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { groundBasicSchema } from "../schemas/ground.schema";
import { getAllSchema } from "../schemas/default.schema";
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

router.post(
   "/ground",
   authMiddleware,
   upload.single("image"),
   schemaValidation(groundBasicSchema),
   createGround
);

export default router;
