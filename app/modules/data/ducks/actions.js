import {
  SET_USERS,
  SET_CURRENT_USER,
  UPDATE_CURRENT_USER_INFO,
  SET_CATAGORIES,
  SET_SPECIES,
  SET_PRODUCTS,
  SET_SHOP_PRODUCTS,
  SET_LOGISTICS_PRODUCTS,
  SET_TRIP_PRODUCTS,
  SET_CERTS,
  SET_CART_ITEMS,
  REMOVE_CART_ITEMS,
  SET_SHOPS,
  SET_COMMENTS,
  REMOVE_COMMENTS,
  SET_ORDERS,
  REMOVE_ORDERS,
  SET_INQUIRIES,
  REMOVE_INQUIRIES,
  SET_BIDS,
  REMOVE_BIDS,
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
export const setProducts = (type, products) => ({
  type: SET_PRODUCTS,
  payload: { products },
  meta: { type },
});
// todo refactor like certs
export const setShopProducts = (shopProducts) => ({
  type: SET_SHOP_PRODUCTS,
  payload: { shopProducts },
});
export const setLogisticsProducts = (logisticsProducts) => ({
  type: SET_LOGISTICS_PRODUCTS,
  payload: { logisticsProducts },
});
export const setTripProducts = (tripProducts) => ({
  type: SET_TRIP_PRODUCTS,
  payload: { tripProducts },
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
export const setComments = (comments) => ({
  type: SET_COMMENTS,
  payload: { comments },
});
export const removeComments = (ids) => ({
  type: REMOVE_COMMENTS,
  payload: { ids },
});

export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: { orders },
});
export const removeOrders = (ids) => ({
  type: REMOVE_ORDERS,
  payload: { ids },
});

export const setInquiries = (inquiries) => ({
  type: SET_INQUIRIES,
  payload: { inquiries },
});
export const removeInquiries = (ids) => ({
  type: REMOVE_INQUIRIES,
  payload: { ids },
});

export const setBids = (bids) => ({
  type: SET_BIDS,
  payload: { bids },
});
export const removeBids = (ids) => ({
  type: REMOVE_BIDS,
  payload: { ids },
});
