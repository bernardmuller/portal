import {
  addServiceToUserHandler,
  createUserHandler,
  deleteAllServicesfromUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  removeServicefromUserHandler,
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
    authenticate: true,
  },
  {
    method: 'put',
    path: '/users/:id/add-service',
    handler: addServiceToUserHandler,
    authenticate: true,
  },
  {
    method: 'put',
    path: '/users/:id/remove-service',
    handler: removeServicefromUserHandler,
    authenticate: true,
  },
  {
    method: 'delete',
    path: '/users/:id/services',
    handler: deleteAllServicesfromUserHandler,
    authenticate: true,
  },
];

export default endpoints;
