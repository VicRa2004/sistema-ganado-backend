// Se agrega al principio para que carge bien
import dotenv from "dotenv";
import path from "path";

// Carga el archivo .env desde la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
//import routes from "./routes/index.routes";
import { ExpressAppRouter } from "@/core/shared/infrastructure/http/ExpressAppRouter";
import cors from "cors";
import morgan from "morgan";
import { error404 } from "./middlewares/error404.middleware";
import { errorMiddleware } from "./core/shared/infrastructure/middlewares/error.middleware";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//app.use(routes);
// ruta de la app con arquitecturas limpias
app.use(ExpressAppRouter);

// Manejo de rutas cualquiera
app.use(error404);

// Manejo de errores
app.use(errorMiddleware); // middleware nuevo

export default app;
