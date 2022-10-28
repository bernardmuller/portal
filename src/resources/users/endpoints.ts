import { Request, Response } from "express";
import { get } from "http";
import { createUserHandler, getUserHandler, getUsersHandler } from "./handlers";

const endpoints = [
	{
		method: "get",
		path: "/users",
		handler: getUsersHandler,
		authenticate: true,
	},
	{
		method: "get",
		path: "/users/:id",
		handler: getUserHandler,
		authenticate: true,
	},
	{
		method: "post",
		path: "/users",
		handler: createUserHandler,
		authenticate: true,
	},
];

export default endpoints;
