import { Entity, Schema, Client } from "redis-om";

class User extends Entity {}
export const userSchema = new Schema(
	User,
	{
		email: { type: "string" },
		password: { type: "string" },
		service: { type: "string" },
	},
	{ dataStructure: "JSON" }
);
