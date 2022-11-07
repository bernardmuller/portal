import {
  addServiceToUserHandler,
  createUserHandler,
  deleteAllServicesfromUserHandler,
  deleteUserHandler,
  demoteAdminToUserHandler,
  getUserHandler,
  getUsersHandler,
  promoteUserToAdminHandler,
  removeServicefromUserHandler,
  updateUserServiceHandler,
} from './handlers';

const endpoints = [
  {
    method: 'get',
    path: '/users',
    handler: getUsersHandler,
    authenticate: true,
    requiresAdmin: true,
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
  {
    method: 'put',
    path: '/users/:id/promote',
    handler: promoteUserToAdminHandler,
    authenticate: true,
    requiresAdmin: true,
  },
  {
    method: 'put',
    path: '/users/:id/demote',
    handler: demoteAdminToUserHandler,
    authenticate: true,
    requiresAdmin: true,
  },
];

export default endpoints;
