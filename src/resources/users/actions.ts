import { client, userSchema } from '../../db';

export const createUser = async (data: {
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
    .where('email')
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
  return user.toRedisJson();
};

// function throws error on request
export const updateUser = async (id: string, data: any) => {
  const userRepository = client.fetchRepository(userSchema);
  const user = await userRepository.fetch(id);
  // @ts-ignore
  user.service = data.service;
  await userRepository.save(user);
  return user.toRedisJson();
};

export const deleteUser = async (id: string) => {
  const userRepository = client.fetchRepository(userSchema);
  await userRepository.remove(id);
  return { Ok: true, status: 200, message: 'User deleted' };
};

export const checkIfUserExists = async (id: string): Promise<boolean> => {
  const exists = await client.execute(['EXISTS', `User:${id}`]);
  return exists as boolean;
};

export const checkIfUserExistsByEmail = async (
  email: string,
): Promise<boolean> => {
  const user = await getUserByEmail(email);
  return user[0] ? true : false;
};
