import { loadSessionTokenInCookie } from './utils/sessionTokenUtils';
import createApi from './modules/api/api';

export default () => {
  const sessionToken = loadSessionTokenInCookie();
  return createApi(sessionToken);
};
