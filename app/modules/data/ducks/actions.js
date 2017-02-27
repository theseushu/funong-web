import {
  SET_USERS,
  SET_CURRENT_USER,
  UPDATE_CURRENT_USER_INFO,
  SET_CATAGORIES,
  SET_SPECIES,
  SET_SPECIFICATIONS,
  SET_SHOP_PRODUCTS,
  SET_SUPPLY_PRODUCTS,
  SET_LOGISTICS_PRODUCTS,
  SET_CERTS,
  SET_CART_ITEMS,
  REMOVE_CART_ITEMS,
  SET_SHOPS,
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
export const setUsers = (users) => ({
  type: SET_USERS,
  payload: { users },
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
export const setShopProducts = (shopProducts) => ({
  type: SET_SHOP_PRODUCTS,
  payload: { shopProducts },
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
export const setCartItems = (cartItems) => ({
  type: SET_CART_ITEMS,
  payload: { cartItems },
});
export const removeCartItems = (ids) => ({
  type: REMOVE_CART_ITEMS,
  payload: { ids },
});
export const setShops = (shops) => ({
  type: SET_SHOPS,
  payload: { shops },
});

