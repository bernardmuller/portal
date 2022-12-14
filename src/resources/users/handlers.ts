import { Request, Response } from 'express';
import { validateUserParams } from '../../utils';
import {
  addServiceToUser,
  checkIfUserExists,
  createUser,
  deleteAllServicesFromUser,
  deleteUser,
  demoteAdminToUser,
  getUser,
  getUserByEmail,
  getUsers,
  promoteUserToAdmin,
  removeServiceFromUser,
  updateUser,
  updateUserService,
} from './actions';
import { User } from 'interfaces';
import { NotFoundError } from '../../utils/errors';

export const getUsersHandler = async (req: Request, res: Response) => {
  const users = await getUsers();
  res.send(users);
};

export const getUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingUser = await checkIfUserExists(id);
  if (!existingUser) {
    throw new NotFoundError('User not found.');
  }
  const user = await getUser(id);
  res.send(user);
};

export const createUserHandler = async (req: Request, res: Response) => {
  const userParams = {
    email: req.body.email,
    password: req.body.password,
  };
  const existingUser = await getUserByEmail(req.body.email);
  if (existingUser.length > 0) {
    throw new Error('User Already exists');
  }

  const newUser = await createUser(userParams as User);
  res.send({
    Ok: true,
    status: 200,
    data: newUser,
  });
};

export const updateUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingUser = await checkIfUserExists(id);

  if (!existingUser) throw new NotFoundError('User not found.');

  const userParams = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  validateUserParams(userParams);

  const updatedUser = await updateUser(id, userParams);
  res.send({
    Ok: true,
    status: 200,
    data: updatedUser,
  });
};

export const updateUserServiceHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingUser = await checkIfUserExists(id);

  if (!existingUser) throw new NotFoundError('User not found.');

  const userParams = {
    service: req.body.service,
  };

  validateUserParams(userParams);

  const updatedUser = await updateUserService(id, userParams.service);
  res.send({
    Ok: true,
    status: 200,
    data: updatedUser,
  });
};

export const addServiceToUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingUser = await checkIfUserExists(id);

  if (!existingUser) throw new NotFoundError('User not found.');

  const userParams = {
    service: req.body.service,
  };

  validateUserParams(userParams);

  const updatedUser = await addServiceToUser(id, userParams.service);
  res.send({
    Ok: true,
    status: 200,
    data: updatedUser,
  });
};

export const removeServicefromUserHandler = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const existingUser = await checkIfUserExists(id);

  if (!existingUser) throw new NotFoundError('User not found.');

  const userParams = {
    service: req.body.service,
  };

  validateUserParams(userParams);

  const updatedUser = await removeServiceFromUser(id, userParams.service);
  res.send({
    Ok: true,
    status: 200,
    data: updatedUser,
  });
};

export const deleteAllServicesfromUserHandler = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const existingUser = await checkIfUserExists(id);

  if (!existingUser) throw new NotFoundError('User not found.');

  const updatedUser = await deleteAllServicesFromUser(id);
  res.send({
    Ok: true,
    status: 200,
    data: updatedUser,
  });
};

export const promoteUserToAdminHandler = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const existingUser = await checkIfUserExists(id);

  if (!existingUser) throw new NotFoundError('User not found.');

  const promotedUser = await promoteUserToAdmin(id);
  res.send({
    Ok: true,
    status: 200,
    data: promotedUser,
  });
};

export const demoteAdminToUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingUser = await checkIfUserExists(id);

  if (!existingUser) throw new NotFoundError('User not found.');

  const promotedUser = await demoteAdminToUser(id);
  res.send({
    Ok: true,
    status: 200,
    data: promotedUser,
  });
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingUser = await checkIfUserExists(id);

  if (!existingUser) throw new NotFoundError('User not found.');

  const deletedUser = await deleteUser(id);
  res.send(deletedUser);
};
