import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
import { swaggerOptions } from "./swaggerOptions";
import { Auth } from "./auth";
import { config } from "./config";
import routes from "./routes";

const app = express();

app.set("port", config.PORT);

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

Auth();

app.use("/api", routes);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc(swaggerOptions)));

export default app;
