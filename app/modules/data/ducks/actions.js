import { SET_CURRENT_USER, UPDATE_CURRENT_USER_INFO, SET_CATALOGS, SET_CATAGORIES, SET_SPECIES } from './constants';

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
export const setCategories = (categories) => ({
  type: SET_CATAGORIES,
  payload: { categories },
});
export const setSpecies = (species) => ({
  type: SET_SPECIES,
  payload: { species },
});
