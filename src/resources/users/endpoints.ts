import { Request, Response } from 'express';
import { get } from 'http';
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserServiceHandler,
} from './handlers';

const endpoints = [
  {
    method: 'get',
    path: '/users',
    handler: getUsersHandler,
    authenticate: true,
  },
  {
    method: 'get',
    path: '/users/:id',
    handler: getUserHandler,
    authenticate: true,
  },
  {
    method: 'post',
    path: '/users',
    handler: createUserHandler,
    authenticate: true,
  },
  {
    method: 'put',
    path: '/users/:id',
    handler: updateUserServiceHandler,
    authenticate: true,
  },
  {
    method: 'delete',
    path: '/users/:id',
    handler: deleteUserHandler,
    authenticate: false,
  },
];

export default endpoints;
