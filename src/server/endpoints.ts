import userEndpoints from '../resources/users/endpoints';
import authEndpoints from '../resources/auth/endpoints';

const appEndpoints = [...userEndpoints, ...authEndpoints];

export default appEndpoints;
