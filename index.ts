import express, { Application } from "express";
import httpProxy from "express-http-proxy";
import dotenv from "dotenv";
dotenv.config();

const app = express();

type TService = {
	name: string;
	developmentUrl: string;
	productionUrl: string;
	queryParam: string;
};

const services: TService[] = [
	{
		name: "munchies",
		developmentUrl: `http://localhost:5000/api`,
		productionUrl: "https://munchiesbackend-production.up.railway.app/api",
		queryParam: "/munchies",
	},
];

function requireEnvVar(key: string) {
	const variable = process.env[key];
	if (!variable)
		throw new Error(`environment variable with name "${key}" not found`);
	return variable;
}

function checkEnvironmentIsProduction() {
	return requireEnvVar("NODE_ENV") === "production";
}

function buildProxyUrl(service: TService) {
	const url = checkEnvironmentIsProduction()
		? service.productionUrl
		: service.developmentUrl;
	console.log(url);
	return url;
}

function createEndpoint(app: Application, service: TService) {
	app.use(service.queryParam.toString(), httpProxy(buildProxyUrl(service)));
}

function createProxyEndpoints(services: TService[]) {
	services.forEach((service) => createEndpoint(app, service));
}

createProxyEndpoints(services);

app.get("/", function (req, res) {
	res.send("bernardmuller.dev api portal");
});

const port =
	requireEnvVar("PORT") === "production" ? requireEnvVar("PORT") : 6000;

app.listen(port, () => {
	console.log("Server listening on port " + port);
});
