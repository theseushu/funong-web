import { SET_CURRENT_USER, UPDATE_CURRENT_USER_INFO, SET_CATALOGS } from './constants';

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: { user },
});
export const updateCurrentUserInfo = (user) => ({
  type: UPDATE_CURRENT_USER_INFO,
  payload: { user },
});
export const setCatalogs = (catalogs) => ({
  type: SET_CATALOGS,
  payload: { catalogs },
});
