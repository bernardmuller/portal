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

export const updateUser = async (
	id: string,
	data: {
		firstName?: string;
		lastName?: string;
		dateOfBirth?: Date;
		householdId?: string | null;
	}
) => {
	const user = await getUsers();
	if (!user) {
		throw new Error("User not found");
	}

	const updatedUserData = await db.user.update({
		where: { id },
		data,
	});

	const updatedUser = UserModel.parse(updatedUserData);
	return updatedUser;
};

export const deleteUser = async (id: string) => {
	const user = await getUsers();
	if (!user) throw new Error("User not found");

	await db.user.delete({
		where: {
			id,
		},
	});
	return { message: "User deleted successfully" };
};

export const deleteAllUsers = async () => {
	await db.user.deleteMany();
};
