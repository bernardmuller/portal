import dotenv from "dotenv";
dotenv.config();

export function requireEnvVar(key: string) {
	const variable = process.env[key];
	if (!variable)
		throw new Error(`environment variable with name "${key}" not found`);
	return variable;
}

export function checkEnvironmentIsProduction() {
	return requireEnvVar("NODE_ENV") === "production";
}

export function getUuid() {}

export const validateUserParams = (params: any) => {
	for (const item in params) {
		if (params[item] === undefined) {
			throw new Error(`Missing ${item} parameter`);
		}
	}
};
