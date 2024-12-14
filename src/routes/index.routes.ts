import { Router } from "express";
import auth from "./auth.routes";
import owner from "./owner.routes";
import ground from "./ground.routes";

const routes = Router();

routes.use(auth);
routes.use(owner);
routes.use(ground);

export default routes;
