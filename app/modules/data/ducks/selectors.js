import { createSelector } from 'reselect';
import { denormalize } from 'denormalizr';

import { ProductsSchema, CertsSchema } from './schemas';

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

export const specificationsSelector = createSelector(
  rootSelector,
  (data) => data.entities.specifications || {},
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
