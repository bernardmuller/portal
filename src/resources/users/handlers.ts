import { client } from '../../db';
import { Request, Response } from 'express';
import { validateUserParams } from '../../utils';
import {
  checkIfUserExists,
  createUser,
  deleteUser,
  getUser,
  getUserByEmail,
  getUsers,
  updateUser,
} from './actions';

export const getUsersHandler = async (req: Request, res: Response) => {
  const users = await getUsers();
  res.send(users);
};

export const getUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingUser = await checkIfUserExists(id);
  if (!existingUser) {
    res.send({
      Ok: true,
      status: 200,
      message: 'User not found',
    });
    return;
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

  const newUser = await createUser(userParams);
  res.send({
    Ok: true,
    status: 200,
    data: newUser,
  });
  return;
};

export const updateUserServiceHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingUser = await checkIfUserExists(id);

  if (!existingUser)
    res.send({
      Ok: false,
      status: 401,
      message: `User not found.`,
    });

  const userParams = {
    service: req.body.service,
  };

  validateUserParams(userParams);

  const updatedUser = await updateUser(id, userParams);
  res.send({
    Ok: true,
    status: 200,
    data: updatedUser,
  });
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingUser = await checkIfUserExists(id);

  if (!existingUser) {
    res.send({
      Ok: false,
      status: 401,
      message: `User not found.`,
    });
    return;
  }

  const deletedUser = await deleteUser(id);
  res.send(deletedUser);
};
