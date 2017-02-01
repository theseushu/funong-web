import { createSelector } from 'reselect';
import _find from 'lodash/find';
import { denormalize } from 'denormalizr';

import { ProductsSchema, CertsSchema, SupplyProductsSchema } from './schemas';

const rootSelector = (state) => state.data;

export const currentUserSelector = createSelector(
  rootSelector,
  (data) => {
    const { entities: { users = [] }, currentUser = '' } = data;
    const user = users && users[currentUser];
    return user;
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

export const productsSelector = createSelector(
  rootSelector,
  (data) => {
    if (!data.entities.products) {
      return [];
    }
    const result = Object.values(denormalize(data.entities.products, data.entities, ProductsSchema));
    return result;
  },
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
