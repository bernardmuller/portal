import {
  forgotPasswordHandler,
  loginHandler,
  registerHandler,
  resetPasswordHandler,
} from './handlers';

const endpoints = [
  {
    method: 'post',
    path: '/auth/register',
    handler: registerHandler,
    authenticate: false,
    requiresAdmin: false,
  },
  {
    method: 'post',
    path: '/auth/login',
    handler: loginHandler,
    authenticate: false,
    requiresAdmin: false,
  },
  {
    method: 'post',
    path: '/auth/resetpassword',
    handler: resetPasswordHandler,
    authenticate: false,
    requiresAdmin: false,
  },
  {
    method: 'post',
    path: '/auth/forgotpassword',
    handler: forgotPasswordHandler,
    authenticate: false,
    requiresAdmin: false,
  },
];

export default endpoints;
