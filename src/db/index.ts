import { Request, Response } from "express";
import { Client, Entity, Schema, Repository } from "redis-om";
import { requireEnvVar } from "../utils";

// redis://username:password@host:port

class User extends Entity {}
export const userSchema = new Schema(
	User,
	{
		id: { type: "string" },
		email: { type: "string" },
		password: { type: "string" },
		service: { type: "string" },
	},
	{ dataStructure: "JSON" }
);

const client = new Client();

const dBConfigurattion = () => {};

export async function connectToDatabase() {
	client
		.open(`${requireEnvVar("DB_URL")}`)
		.then(() => {
			console.log("Connection to redis is open");
		})
		.catch((err) => console.log(err));
}

// export async function createUser() {
// 	const personRepository = client.fetchRepository(userSchema);

// 	await personRepository.createIndex();
// }

export const getUsers = async (req: Request, res: Response) => {
	const userRepository = client.fetchRepository(userSchema);
	const users = await userRepository.search().return.all();
	console.log(users);
	res.send(users);
};

export const createUser = async (req: any, res: Response) => {
	// const newUser = await userRepository.createAndSave(req.body);
	// console.log(newUser);
	// res.send(newUser);
};
