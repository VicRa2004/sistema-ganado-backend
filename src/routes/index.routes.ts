import { Router } from "express";
// Rtas
import auth from "./auth.routes";
import ground from "./ground.routes";
import race from "./race.routes";
import iron from "./iron.routes";

const routes = Router();

routes.use(auth);
routes.use(ground);
routes.use(race);
routes.use(iron);

export default routes;
