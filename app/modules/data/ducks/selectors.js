import { createSelector } from 'reselect';
import _find from 'lodash/find';
import { denormalize } from 'denormalizr';

import { CertsSchema, SupplyProductsSchema, LogisticsProductsSchema, CartItemsSchema, ShopsSchema } from './schemas';

const rootSelector = (state) => state.data;

export const currentUserSelector = createSelector(
  rootSelector,
  (data) => {
    const { entities: { users = {} }, currentUser = '' } = data;
    const user = users && users[currentUser];
    return user;
  }
);

export const usersSelector = createSelector(
  rootSelector,
  (data) => {
    const { entities: { users = {} } } = data;
    return Object.values(users);
  }
);

export const superUsersSelector = createSelector(
  rootSelector,
  (data) => {
    const { entities: { users = {} } } = data;
    return Object.values(users).filter((user) => user.roles.indexOf('super') >= 0);
  }
);

export const adminUsersSelector = createSelector(
  rootSelector,
  (data) => {
    const { entities: { users = {} } } = data;
    return Object.values(users).filter((user) => user.roles.indexOf('admin') >= 0);
  }
);

export const catalogsSelector = createSelector(
  rootSelector,
  (data) => {
    const { entities: { catalogs = {} } } = data;
    return Object.values(catalogs);
  }
);

export const categoriesSelector = createSelector(
  rootSelector,
  (data) => data.entities.categories || {},
);

export const speciesSelector = createSelector(
  rootSelector,
  (data) => data.entities.species || {},
);

export const supplyProductsSelector = createSelector(
  rootSelector,
  (data) => {
    const { entities: { supplyProducts } } = data;
    if (!supplyProducts) {
      return [];
    }
    const result = Object.values(denormalize(supplyProducts, data.entities, SupplyProductsSchema));
    return result;
  },
);

export const createSupplyProductSelector = (objectId) => createSelector(
  supplyProductsSelector,
  (products) => _find(products, (p) => p.objectId === objectId),
);

export const userSupplyProductsSelector = (objectId) => createSelector(
  supplyProductsSelector,
  (products) => {
    if (!products) {
      return [];
    }
    const result = products.filter((p) => p.owner.objectId === objectId);
    return result;
  },
);

export const logisticsProductsSelector = createSelector(
  rootSelector,
  (data) => {
    const { entities: { logisticsProducts } } = data;
    if (!logisticsProducts) {
      return [];
    }
    const result = Object.values(denormalize(logisticsProducts, data.entities, LogisticsProductsSchema));
    return result;
  },
);
export const createLogisticsProductSelector = (objectId) => createSelector(
  logisticsProductsSelector,
  (products) => _find(products, (p) => p.objectId === objectId),
);

export const userLogisticsProductsSelector = (objectId) => createSelector(
  logisticsProductsSelector,
  (products) => {
    if (!products) {
      return [];
    }
    const result = products.filter((p) => p.owner.objectId === objectId);
    return result;
  },
);

export const certsSelector = createSelector(
  rootSelector,
  (data) => {
    const { certs } = data.entities;
    if (!data.entities.certs || Object.values(data.entities.certs) === 0) {
      return [];
    }
    const result = denormalize(Object.values(certs), data.entities, CertsSchema);
    return result;
  },
);

export const cartItemsSelector = createSelector(
  rootSelector,
  currentUserSelector,
  (data, currentUser) => {
    if (currentUser) {
      const { cartItems } = data.entities;
      if (!cartItems || Object.values(cartItems) === 0) {
        return [];
      }
      return denormalize(Object.values(cartItems), data.entities, CartItemsSchema);
    }
    return [];
  },
);

export const shopsSelector = createSelector(
  rootSelector,
  (data) => {
    const { shops } = data.entities;
    if (!shops || Object.values(shops) === 0) {
      return [];
    }
    const result = denormalize(Object.values(shops), data.entities, ShopsSchema);
    return result;
  },
);

export const myShopSelector = createSelector(
  shopsSelector,
  currentUserSelector,
  (shops, currentUser) => _find(shops, (shop) => shop.owner.objectId === currentUser.objectId),
);
