import { registerHandler } from './handlers';

const endpoints = [
  {
    method: 'post',
    path: '/auth/register',
    handler: registerHandler,
    authenticate: false,
  },
];

export default endpoints;
