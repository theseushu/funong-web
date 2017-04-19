import _zipObject from 'lodash/zipObject';
import { normalize } from 'normalizr';
import {
  UPDATE_DATA,
  REMOVE_ENTITIES,
} from './constants';

import { UserSchema, UsersSchema,
  CategoriesSchema, SpeciesArraySchema,
  ProductSchemas,
  CertsSchema, CartItemsSchema, ShopsSchema,
  CommentsSchema, OrdersSchema, InquiriesSchema, BidsSchema, PublishesSchemas } from './schemas';

export const setCurrentUser = (user) => {
  const data = normalize(user, UserSchema);
  const payload = Object.assign({}, data, { currentUser: data.result });
  return { type: UPDATE_DATA, payload };
};

// todo delete this one
export const updateCurrentUserInfo = (user) => {
  const data = normalize(user, UserSchema);
  const payload = Object.assign({}, data, { currentUser: data.result });
  return { type: UPDATE_DATA, payload };
};

export const setUsers = (users) => {
  const data = normalize(users, UsersSchema);
  const payload = Object.assign({}, data);
  return { type: UPDATE_DATA, payload };
};

export const setCategories = (categories) => {
  const data = normalize(categories, CategoriesSchema);
  const payload = Object.assign({}, data);
  return { type: UPDATE_DATA, payload };
};

export const setSpecies = (species) => {
  const data = normalize(species, SpeciesArraySchema);
  const payload = Object.assign({}, data);
  return { type: UPDATE_DATA, payload };
};

export const setProducts = (type, products) => {
  const data = normalize(products, ProductSchemas[type].array);
  const payload = Object.assign({}, data);
  return { type: UPDATE_DATA, payload };
};
export const removeProducts = (type, ids) =>
  ({ type: REMOVE_ENTITIES, payload: { entities: { [ProductSchemas[type].schema().getKey()]: _zipObject(ids, ids.map(() => null)) } } });

export const setCerts = (certs) => {
  const data = normalize(certs, CertsSchema);
  const payload = Object.assign({}, data);
  return { type: UPDATE_DATA, payload };
};
export const setCartItems = (cartItems) => {
  const data = normalize(cartItems, CartItemsSchema);
  const payload = Object.assign({}, data);
  return { type: UPDATE_DATA, payload };
};
export const removeCartItems = (ids) =>
  ({ type: REMOVE_ENTITIES, payload: { entities: { [CartItemsSchema.getItemSchema().getKey()]: _zipObject(ids, ids.map(() => null)) } } });
export const setShops = (shops) => {
  const data = normalize(shops, ShopsSchema);
  const payload = Object.assign({}, data);
  return { type: UPDATE_DATA, payload };
};
export const setComments = (comments) => {
  const data = normalize(comments, CommentsSchema);
  const payload = Object.assign({}, data);
  return { type: UPDATE_DATA, payload };
};

export const removeComments = (ids) =>
  ({ type: REMOVE_ENTITIES, payload: { entities: { [CommentsSchema.getItemSchema().getKey()]: _zipObject(ids, ids.map(() => null)) } } });

export const setOrders = (orders) => {
  const data = normalize(orders, OrdersSchema);
  const payload = Object.assign({}, data);
  return { type: UPDATE_DATA, payload };
};
export const removeOrders = (ids) =>
  ({ type: REMOVE_ENTITIES, payload: { entities: { [OrdersSchema.getItemSchema().getKey()]: _zipObject(ids, ids.map(() => null)) } } });

export const setInquiries = (inquiries) => {
  const data = normalize(inquiries, InquiriesSchema);
  const payload = Object.assign({}, data);
  return { type: UPDATE_DATA, payload };
};
export const removeInquiries = (ids) =>
  ({ type: REMOVE_ENTITIES, payload: { entities: { [InquiriesSchema.getItemSchema().getKey()]: _zipObject(ids, ids.map(() => null)) } } });

export const setBids = (bids) => {
  const data = normalize(bids, BidsSchema);
  const payload = Object.assign({}, data);
  return { type: UPDATE_DATA, payload };
};

export const removeBids = (ids) => ({ type: REMOVE_ENTITIES, payload: { entities: { [BidsSchema.getItemSchema().getKey()]: _zipObject(ids, ids.map(() => null)) } } });

export const setPublishes = (type, entries) => {
  const data = normalize(entries, PublishesSchemas[type]);
  const payload = Object.assign({}, data);
  return { type: UPDATE_DATA, payload };
};
export const removePublishes = (type, ids) =>
  ({ type: REMOVE_ENTITIES, payload: { entities: { [PublishesSchemas[type].getItemSchema().getKey()]: _zipObject(ids, ids.map(() => null)) } } });
