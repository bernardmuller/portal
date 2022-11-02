import { PORT } from "../config";
import express from "express";
import { initializeServices } from "../services";
import { createProxyEndpoints, dbMiddleware, portCB } from "./utils";
import { connectToDatabase } from "../db";
import helmet from "helmet";
import bodyParser from "body-parser";
import { router } from "./routes";
import { errorHandler } from "./errors";

function createApp() {
	const app = express();

	// todo: extract app config
	app.use(helmet());
	app.use(bodyParser.json());

	// todo extract app route into generator

	app.use("/", router);
	createProxyEndpoints(app, initializeServices());

	app.use(errorHandler);

	app.listen(PORT, () => {
		portCB();
		connectToDatabase();
	});
}

export default createApp;
