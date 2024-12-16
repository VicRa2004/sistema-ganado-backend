import { Router } from "express";
import auth from "./auth.routes";
import ground from "./ground.routes";
import race from "./race.routes";

const routes = Router();

routes.use(auth);
routes.use(ground);
routes.use(race);

export default routes;
