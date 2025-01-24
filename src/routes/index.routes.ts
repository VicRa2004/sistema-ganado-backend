import { Router } from "express";
// Rtas
import auth from "./auth.routes";
import ground from "./ground.routes";
import race from "./race.routes";
import iron from "./iron.routes";
import cattle from "./cattle.routes";

const routes = Router();

routes.use(auth);
routes.use(ground);
routes.use(race);
routes.use(iron);
routes.use(cattle)

export default routes;
