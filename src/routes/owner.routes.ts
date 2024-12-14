import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { schemaValidation } from "../middlewares/schemaValidator.middleware";
import { ownerUpdateSchema, ownerBasicSchema } from "../schemas/owner.schema";
import { getAllSchema, paramSchema } from "../schemas/default.schema";
import {
	getOwners,
	getOneOwner,
	createOwner,
	updateOwner,
	deleteOwner,
} from "../controllers/owner.controller";

const routes = Router();

// Rutas protegidas

// Ruta para obtener todos los propietarios de un usuario
routes.get("/owner", authMiddleware, schemaValidation(getAllSchema), getOwners);

routes.get(
	"/owner/:id",
	authMiddleware,
	schemaValidation(paramSchema),
	getOneOwner,
);

routes.post(
	"/owner/",
	authMiddleware,
	schemaValidation(ownerBasicSchema),
	createOwner,
);

routes.put(
	"/owner/:id",
	authMiddleware,
	schemaValidation(ownerUpdateSchema),
	updateOwner,
);

routes.delete(
	"/owner/:id",
	authMiddleware,
	schemaValidation(paramSchema),
	deleteOwner,
);

export default routes;
