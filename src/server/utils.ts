import { Application } from "express";
import { checkEnvironmentIsProduction } from "../utils";
import httpProxy from "express-http-proxy";
import { TService } from "../interfaces/services";
import { PORT } from "../config";

export const portCB = () => {
	console.log("Server is runnning on port " + PORT);
};

export function buildProxyUrl(service: TService) {
	const url = checkEnvironmentIsProduction()
		? service.productionUrl
		: service.developmentUrl;
	return url;
}

export function createEndpoint(app: Application, service: TService) {
	app.use(service.queryParam.toString(), httpProxy(buildProxyUrl(service)));
}

export function createProxyEndpoints(app: Application, services: TService[]) {
	services.forEach((service) => createEndpoint(app, service));
}
