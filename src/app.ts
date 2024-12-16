// Se agrega al principio para que carge bien
import dotenv from "dotenv";
import path from "path";

// Carga el archivo .env desde la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import routes from "./routes/index.routes";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./middlewares/error.middleware";
import { error404 } from "./middlewares/error404.middleware";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(routes);

// Manejo de rutas cualquiera
app.use(error404);

// Manejo de errores
app.use(errorHandler);

export default app;
