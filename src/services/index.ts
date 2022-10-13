import { TService, TServices } from "../interfaces/services";
import servicesData from "../../services.json";

export const services: TServices = servicesData;

function validateServices(servicesData: TServices) {
	if (servicesData.length < 1)
		throw new Error("No services provided in services.json");
	return servicesData;
}

export function initializeServices() {
	return validateServices(services);
}
