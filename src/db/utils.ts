import { client } from './index';
import { userSchema } from './models/user';

export const fetchUserRepository = () => {
  return client.fetchRepository(userSchema);
};
