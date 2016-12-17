import { SET_CURRENT_USER, UPDATE_CURRENT_USER_INFO, SET_CATALOG_TYPES } from './constants';

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: { user },
});
export const updateCurrentUserInfo = (user) => ({
  type: UPDATE_CURRENT_USER_INFO,
  payload: { user },
});
export const setCatalogTypes = (types) => ({
  type: SET_CATALOG_TYPES,
  payload: { types },
});
