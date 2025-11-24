import dotenv from "dotenv";
import path from "path";

// Carga el archivo .env desde la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import { ExpressAppRouter } from "@/core/shared/infrastructure/http/ExpressAppRouter";
import cors from "cors";
import morgan from "morgan";
import { errorMiddleware } from "./core/shared/infrastructure/middlewares/error.middleware";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(ExpressAppRouter);
app.use(errorMiddleware);

export default app;
