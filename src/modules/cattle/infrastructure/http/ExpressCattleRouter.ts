import { Router } from "express";
import { ExpressCattleController } from "./ExpressCattleController";

const controller = new ExpressCattleController();
const ExpressCattleRouter = Router();

export { ExpressCattleRouter };
