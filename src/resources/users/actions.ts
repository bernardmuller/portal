import { client, userSchema } from "../../db";

export const createUser = async (data: {
	id?: string;
	email: string;
	firstName?: string;
	password: string;
	services?: string[];
}) => {
	const userRepository = client.fetchRepository(userSchema);
	const newUser = await userRepository.createAndSave(data);
	return newUser;
};

export const getUserByEmail = async (email: string) => {
	const userRepository = client.fetchRepository(userSchema);
	const user = await userRepository
		.search()
		.where("email")
		.equals(email)
		.return.all();
	return user;
};

export const getUsers = async () => {
	const userRepository = client.fetchRepository(userSchema);
	const users = await userRepository.search().return.all();
	return users;
};

export const getUser = async (id: string) => {
	const userRepository = client.fetchRepository(userSchema);
	const user = await userRepository.fetch(id);
	return user;
};

// function throws error on request
export const updateUser = async (id: string, data: any) => {
	const userRepository = client.fetchRepository(userSchema);
	const existingUser = await userRepository.fetch(id);
	const updatedUser = { ...existingUser, ...data };
	console.log(updatedUser);

	await userRepository.save(updatedUser);
	return updatedUser;
};

export const deleteUser = async (id: string) => {
	try {
		const userRepository = client.fetchRepository(userSchema);
		await userRepository.remove(id);
		return { Ok: true, status: 200, message: "User deleted" };
	} catch (error) {
		return {
			Ok: false,
			status: 500,
			message: `Error while deleting user: ${error}`,
		};
	}
};
