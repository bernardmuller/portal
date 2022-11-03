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
  },
  {
    method: 'post',
    path: '/auth/login',
    handler: loginHandler,
    authenticate: false,
  },
  {
    method: 'post',
    path: '/auth/resetpassword',
    handler: resetPasswordHandler,
    authenticate: false,
  },
  {
    method: 'post',
    path: '/auth/forgotpassword',
    handler: forgotPasswordHandler,
    authenticate: false,
  },
];

export default endpoints;
