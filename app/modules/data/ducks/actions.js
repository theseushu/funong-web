import {
  SET_CURRENT_USER,
  UPDATE_CURRENT_USER_INFO,
  SET_CATALOGS,
  SET_CATAGORIES,
  SET_SPECIES,
  SET_SPECIFICATIONS,
  SET_PRODUCT,
  SET_PRODUCTS,
  SET_SUPPLY_PRODUCTS,
  SET_LOGISTICS_PRODUCTS,
  SET_CERTS,
} from './constants';

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: { user },
});
// todo delete this one
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
export const setSpecifications = (specifications) => ({
  type: SET_SPECIFICATIONS,
  payload: { specifications },
});
// todo refactor like certs
export const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: { product },
});
export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: { products },
});
export const setSupplyProducts = (supplyProducts) => ({
  type: SET_SUPPLY_PRODUCTS,
  payload: { supplyProducts },
});
export const setLogisticsProducts = (logisticsProducts) => ({
  type: SET_LOGISTICS_PRODUCTS,
  payload: { logisticsProducts },
});
export const setCerts = (certs) => ({
  type: SET_CERTS,
  payload: { certs },
});

