import { client } from '../../db';
import { fetchUserRepository } from '../../db/utils';

export const createUser = async (data: {
  id: string;
  email: string;
  password: string;
}) => {
  const userRepository = fetchUserRepository();
  const newUser = await userRepository.createAndSave(data);
  return newUser;
};

export const getUserByEmail = async (email: string) => {
  const userRepository = fetchUserRepository();
  const user = await userRepository
    .search()
    .where('email')
    .equals(email)
    .return.all();
  if (!user[0]?.toRedisJson())
    throw new Error(`No user with email: "${email}" found.`);
  return user[0]?.toRedisJson();
};

export const getUsers = async () => {
  const userRepository = fetchUserRepository();
  const users = await userRepository.search().return.all();
  return users;
};

export const getUser = async (id: string) => {
  const userRepository = fetchUserRepository();
  const user = await userRepository.fetch(id);
  return user.toRedisJson();
};

export const getUserByUuid = async (uuid: string) => {
  const userRepository = fetchUserRepository();
  const user = await userRepository
    .search()
    .where('id')
    .equals(uuid)
    .return.all();
  if (!user[0]?.toRedisJson()) throw new Error(`No user found.`);
  return user[0].toRedisJson();
};

export const updateUser = async (
  id: string,
  data: {
    firstname: string;
    lastname: string;
  },
) => {
  const userRepository = fetchUserRepository();
  const user = await userRepository.fetch(id);
  // @ts-ignore
  user.firstname = data.firstname;
  // @ts-ignore
  user.lastname = data.lastname;
  await userRepository.save(user);
  return user.toRedisJson();
};

export const updateUserService = async (id: string, service: string) => {
  const userRepository = fetchUserRepository();
  const user = await userRepository.fetch(id);
  // @ts-ignore
  user.services = service;
  await userRepository.save(user);
  return user.toRedisJson();
};

export const addServiceToUser = async (id: string, service: string) => {
  const userRepository = fetchUserRepository();
  const user = await userRepository.fetch(id);
  // @ts-ignore
  if (!user.services) {
    // @ts-ignore
    user.services = [service];
  } else {
    // @ts-ignore
    for (const item of user.services) {
      if (item === service) {
        throw new Error('Service already registered to this user.');
      }
    }
    // @ts-ignore
    user.services = [...user.services, service];
  }
  // @ts-ignore
  user.services = user.services;
  await userRepository.save(user);
  return user.toRedisJson();
};

export const removeServiceFromUser = async (id: string, service: string) => {
  const userRepository = fetchUserRepository();
  const user = await userRepository.fetch(id);
  // @ts-ignore
  if (!user.services) {
    // @ts-ignore
    throw new Error('User has no services registered.');
  } else {
    // @ts-ignore
    user.services = user.services.filter((item) => item !== service);
  }
  console.log(user.services);
  await userRepository.save(user);
  return user.toRedisJson();
};

export const deleteAllServicesFromUser = async (id: string) => {
  const userRepository = fetchUserRepository();
  const user = await userRepository.fetch(id);
  // @ts-ignore
  user.services = [];
  await userRepository.save(user);
  return user.toRedisJson();
};

export const deleteUser = async (id: string) => {
  const userRepository = fetchUserRepository();
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
  return user ? true : false;
};

export const updateUserPassword = async (id: string, newPassword: string) => {
  const userRepository = fetchUserRepository();
  const user = await userRepository.fetch(id);
  // @ts-ignore
  user.password = newPassword;
  await userRepository.save(user);
  return user.toRedisJson();
};
