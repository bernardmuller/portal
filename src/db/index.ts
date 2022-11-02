import { NextFunction, Request, Response } from "express";
import { Client, Entity, Schema, Repository } from "redis-om";
import { requireEnvVar } from "../utils";

class User extends Entity {
}
export const userSchema = new Schema(
	User,
	{
		email: { type: "string" },
		password: { type: "string" },
		service: {type: "string"}
	}
	
);

export const client = new Client();

export async function connectToDatabase() {
	client
		.open(`${requireEnvVar("DB_URL")}`)
		.then(() => {
			console.log("Connection to redis is open");
		})
		.catch((err) => console.log(err));
}

export const configureRedisDb = (req: Request, res: Response) => {
	return redisRepositoryConfig(res);
};

export const redisRepositoryConfig = (res: Response) => {
	const userRepository = client.fetchRepository(userSchema);
	return (res.locals.userRepository = userRepository);
};
