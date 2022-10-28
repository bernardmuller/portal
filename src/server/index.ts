import { PORT } from "../config";
import express from "express";
import { initializeServices } from "../services";
import { createProxyEndpoints, portCB } from "./utils";
import { connectToDatabase, createUser, getUsers } from "../db";
import helmet from "helmet";
import bodyParser from "body-parser";

function createApp() {
	const app = express();

	// todo: extract app config
	app.use(helmet());
	app.use(bodyParser.json());

	// todo extract app route into generator
	app.get("/", function (req, res) {
		res.send("bernardmuller.dev api portal");
	});

	app.get("/users", getUsers);
	app.post("/users", createUser);

	createProxyEndpoints(app, initializeServices());

	app.listen(PORT, () => {
		portCB();
		connectToDatabase();
	});
}

export default createApp;
