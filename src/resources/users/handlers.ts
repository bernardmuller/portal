import { Request, Response } from "express";
import { createUser, getUser, getUserByEmail, getUsers } from "./actions";

export const getUsersHandler = async (req: Request, res: Response) => {
	const users = await getUsers();
	res.send(users);
};

export const getUserHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await getUser(id);
	res.send(user);
};

export const createUserHandler = async (req: Request, res: Response) => {
	const userParams = {
		email: req.body.email,
		password: req.body.password,
	};
	const existingUser = await getUserByEmail(req.body.email);
	if (existingUser)
		res.send({
			Ok: false,
			status: 401,
			message: `User ${req.body.email} already exists`,
		});
	const newUser = await createUser(userParams);
	res.send(newUser);
	console.log(userParams);
};
