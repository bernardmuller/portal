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
    requiresAdmin: false,
  },
  {
    method: 'get',
    path: '/users/:id',
    handler: getUserHandler,
    authenticate: true,
    requiresAdmin: false,
  },
  {
    method: 'post',
    path: '/users',
    handler: createUserHandler,
    authenticate: true,
    requiresAdmin: false,
  },
  {
    method: 'put',
    path: '/users/:id',
    handler: updateUserServiceHandler,
    authenticate: true,
    requiresAdmin: false,
  },
  {
    method: 'delete',
    path: '/users/:id',
    handler: deleteUserHandler,
    authenticate: true,
    requiresAdmin: false,
  },
  {
    method: 'put',
    path: '/users/:id/add-service',
    handler: addServiceToUserHandler,
    authenticate: true,
    requiresAdmin: false,
  },
  {
    method: 'put',
    path: '/users/:id/remove-service',
    handler: removeServicefromUserHandler,
    authenticate: true,
    requiresAdmin: false,
  },
  {
    method: 'delete',
    path: '/users/:id/services',
    handler: deleteAllServicesfromUserHandler,
    authenticate: true,
    requiresAdmin: false,
  },
];

export default endpoints;
