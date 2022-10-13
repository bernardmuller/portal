import { PORT } from "../config";
import express from "express";
import { initializeServices } from "../services";
import { createProxyEndpoints, portCB } from "./utils";

function createApp() {
	const app = express();

	app.get("/", function (req, res) {
		res.send("bernardmuller.dev api portal");
	});

	const services = initializeServices();
	createProxyEndpoints(app, services);

	app.listen(PORT, portCB);
}

export default createApp;
