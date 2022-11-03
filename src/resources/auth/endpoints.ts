import { loginHandler, registerHandler } from './handlers';

const endpoints = [
  {
    method: 'post',
    path: '/auth/register',
    handler: registerHandler,
    authenticate: false,
  },
  {
    method: 'post',
    path: '/auth/login',
    handler: loginHandler,
    authenticate: false,
  },
];

export default endpoints;
