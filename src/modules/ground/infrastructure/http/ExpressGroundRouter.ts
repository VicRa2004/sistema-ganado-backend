import { Router } from "express";
import { GroundController } from "./ExpressGroundController";

const controller = new GroundController();

const ExpressGroundRouter = Router();

ExpressGroundRouter.get("/ground", controller.getAll);

export { ExpressGroundRouter };
