import { requireEnvVar } from "../utils";

const NODE_ENV = requireEnvVar("NODE_ENV");

const PROD_PORT = requireEnvVar("PORT");
export const PORT = NODE_ENV === "production" ? PROD_PORT : 6000;
